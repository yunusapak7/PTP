"""Deterministic media-quality pipeline for PTP visual assets.

The pipeline never generates or reconstructs technical content. Recorded posters
are extracted from the published source videos and receive only tonal corrections,
downscaling, and presentation-safe crops/backgrounds. Representative images receive
per-asset colour grading while their geometry and depicted content stay unchanged.
"""

from __future__ import annotations

import io
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
POSTER_DIR = ROOT / "assets" / "posters"
HOME_DIR = ROOT / "public" / "home-visuals"
STORY_DIR = ROOT / "public" / "story"


@dataclass(frozen=True)
class Grade:
    brightness: float = 1.0
    contrast: float = 1.0
    saturation: float = 1.0
    shadow_lift: float = 0.0
    cyan: float = 0.0
    green: float = 0.0
    warmth: float = 0.0
    sharpen: int = 22


def find_ffmpeg() -> str:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required to extract evidence frames")
    return ffmpeg


def extract_frame(video: Path, timestamp: float) -> Image.Image:
    result = subprocess.run(
        [
            find_ffmpeg(),
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{timestamp:.3f}",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-f",
            "image2pipe",
            "-vcodec",
            "png",
            "-",
        ],
        check=True,
        capture_output=True,
    )
    return Image.open(io.BytesIO(result.stdout)).convert("RGB")


def grade_image(image: Image.Image, grade: Grade, horizontal_split: bool = False) -> Image.Image:
    """Apply bounded tonal transforms without changing image geometry/content."""
    image = ImageEnhance.Brightness(image).enhance(grade.brightness)
    image = ImageEnhance.Contrast(image).enhance(grade.contrast)
    image = ImageEnhance.Color(image).enhance(grade.saturation)

    pixels = np.asarray(image, dtype=np.float32) / 255.0
    luma = 0.2126 * pixels[:, :, 0] + 0.7152 * pixels[:, :, 1] + 0.0722 * pixels[:, :, 2]
    shadows = np.clip((0.58 - luma) / 0.58, 0.0, 1.0)
    mids = np.clip(1.0 - np.abs(luma - 0.5) * 2.0, 0.0, 1.0)

    if grade.shadow_lift:
        pixels += shadows[:, :, None] * grade.shadow_lift

    h, w = luma.shape
    if horizontal_split:
        x = np.linspace(0.0, 1.0, w, dtype=np.float32)[None, :]
        left = np.clip((0.58 - x) / 0.58, 0.0, 1.0)
        right = np.clip((x - 0.42) / 0.58, 0.0, 1.0)
        centre = np.clip(1.0 - np.abs(x - 0.5) * 3.3, 0.0, 1.0)
        pixels[:, :, 0] += right * 0.018
        pixels[:, :, 1] += left * 0.012 + centre * 0.016
        pixels[:, :, 2] += left * 0.022 + centre * 0.010

    pixels[:, :, 0] += mids * grade.warmth
    pixels[:, :, 2] -= mids * grade.warmth * 0.42
    pixels[:, :, 0] -= mids * grade.cyan * 0.50
    pixels[:, :, 1] += mids * grade.cyan * 0.55
    pixels[:, :, 2] += mids * grade.cyan
    pixels[:, :, 1] += mids * grade.green

    image = Image.fromarray(np.uint8(np.clip(pixels, 0.0, 1.0) * 255.0), "RGB")
    if grade.sharpen:
        image = image.filter(ImageFilter.UnsharpMask(radius=0.75, percent=grade.sharpen, threshold=5))
    return image


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(image, size, Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def contain_on_context(
    image: Image.Image,
    size: tuple[int, int],
    *,
    margin: int = 0,
    blur: float = 22.0,
    darken: float = 0.58,
) -> Image.Image:
    """Keep the evidence frame intact over a subdued crop of that same frame."""
    backdrop = cover(image, size).filter(ImageFilter.GaussianBlur(blur))
    backdrop = ImageEnhance.Brightness(backdrop).enhance(darken)
    backdrop = ImageEnhance.Color(backdrop).enhance(0.72)
    inner = ImageOps.contain(
        image,
        (size[0] - margin * 2, size[1] - margin * 2),
        Image.Resampling.LANCZOS,
    )
    x = (size[0] - inner.width) // 2
    y = (size[1] - inner.height) // 2
    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    shadow_box = Image.new("RGBA", (inner.width + 18, inner.height + 18), (0, 0, 0, 115))
    shadow_box = shadow_box.filter(ImageFilter.GaussianBlur(10))
    shadow.alpha_composite(shadow_box, (x - 9, y - 4))
    composed = Image.alpha_composite(backdrop.convert("RGBA"), shadow)
    composed.alpha_composite(inner.convert("RGBA"), (x, y))
    return composed.convert("RGB")


def save_webp(image: Image.Image, path: Path, quality: int = 84) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6, exact=True)


def crop_box_to_size(
    image: Image.Image,
    box: tuple[int, int, int, int],
    size: tuple[int, int],
) -> Image.Image:
    """Crop a documented source region, then resize with no generative detail."""
    cropped = image.crop(box)
    return cropped.resize(size, Image.Resampling.LANCZOS)


def restore_resolution(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Apply a bounded maximum-2x presentation resize to representative media."""
    scale = max(size[0] / image.width, size[1] / image.height)
    if scale > 2.01:
        raise ValueError(f"Refusing resolution restoration above 2x: {image.size} -> {size}")
    restored = image.resize(size, Image.Resampling.LANCZOS)
    return restored.filter(ImageFilter.UnsharpMask(radius=0.7, percent=16, threshold=6))


def build_recorded_posters() -> None:
    configs = {
        "dtpaper-workflow": {
            "video": ROOT / "public" / "media" / "dtpaper-workflow.mp4",
            "timestamp": 16.8,
            "grade": Grade(brightness=1.035, contrast=1.055, saturation=1.025, shadow_lift=0.012, cyan=0.006, sharpen=20),
            "portrait": True,
            "desktop": (1024, 576),
        },
        "ceralith-ovenable-demo": {
            "video": ROOT / "public" / "media" / "ceralith-ovenable-demo.mp4",
            "timestamp": 0.0,
            "grade": Grade(brightness=1.025, contrast=1.045, saturation=1.025, shadow_lift=0.010, warmth=0.004, sharpen=18),
            "portrait": True,
            "desktop": (1024, 576),
        },
        "bioma-oil-barrier-occ": {
            "video": ROOT / "public" / "media" / "bioma-oil-barrier-occ.mp4",
            "timestamp": 20.8,
            "grade": Grade(brightness=1.045, contrast=1.055, saturation=1.025, shadow_lift=0.014, warmth=0.003, sharpen=18),
            "portrait": False,
            "desktop": (1280, 720),
        },
    }

    for stem, config in configs.items():
        frame = grade_image(extract_frame(config["video"], config["timestamp"]), config["grade"])
        desktop_size = config["desktop"]
        if config["portrait"]:
            desktop = contain_on_context(frame, desktop_size)
            modal = desktop.copy()
            thumbnail = contain_on_context(frame, (480, 270), blur=14, darken=0.54)
            mobile = contain_on_context(frame, (720, 900), margin=0, blur=20, darken=0.60)
        else:
            desktop = cover(frame, desktop_size)
            modal = desktop.copy()
            thumbnail = cover(frame, (480, 270))
            mobile = contain_on_context(frame, (720, 900), blur=20, darken=0.56)

        save_webp(desktop, POSTER_DIR / f"{stem}-poster-v2.webp", 85)
        save_webp(mobile, POSTER_DIR / f"{stem}-poster-mobile-v2.webp", 84)
        save_webp(thumbnail, POSTER_DIR / f"{stem}-poster-thumbnail-v2.webp", 82)
        save_webp(modal, POSTER_DIR / f"{stem}-poster-modal-v2.webp", 86)


def build_representative_grades() -> None:
    grades: dict[str, tuple[Grade, bool]] = {
        "home-hero-material-transition-v2.webp": (Grade(1.035, 1.085, 1.10, 0.010, cyan=0.005, warmth=0.003, sharpen=26), True),
        "home-dtpaper-representative-v2.webp": (Grade(1.045, 1.075, 1.13, 0.012, cyan=0.008, green=0.002, sharpen=24), False),
        "home-ceralith-representative-v2.webp": (Grade(1.035, 1.075, 1.11, 0.018, warmth=0.010, green=0.001, sharpen=22), False),
        "home-bioma-representative-v2.webp": (Grade(1.035, 1.080, 1.13, 0.014, green=0.006, warmth=0.006, sharpen=24), False),
        "home-process-material-challenge-v2.webp": (Grade(1.040, 1.080, 1.10, 0.012, cyan=0.003, warmth=0.004, sharpen=24), False),
        "home-process-chemistry-substrate-v2.webp": (Grade(1.055, 1.070, 1.08, 0.012, cyan=0.008, sharpen=23), False),
        "home-process-coating-application-v2.webp": (Grade(1.035, 1.085, 1.12, 0.012, cyan=0.003, green=0.008, sharpen=24), False),
        "home-process-validation-v2.webp": (Grade(1.045, 1.075, 1.09, 0.015, warmth=0.008, sharpen=22), False),
        "home-process-industrial-scale-v2.webp": (Grade(1.035, 1.090, 1.10, 0.014, cyan=0.005, green=0.004, warmth=0.003, sharpen=24), False),
        "home-integration-representative-v2.webp": (Grade(1.045, 1.080, 1.09, 0.016, cyan=0.004, warmth=0.004, sharpen=24), False),
    }

    for source_name, (grade, split) in grades.items():
        source = HOME_DIR / source_name
        target = HOME_DIR / source_name.replace("-v2.webp", "-v3.webp")
        image = Image.open(source).convert("RGB")
        graded = grade_image(image, grade, horizontal_split=split)
        save_webp(graded, target, 84 if image.width > 600 else 82)


def build_story_representative_grades() -> None:
    grades: dict[str, Grade] = {
        "dtpaper-step-textile.webp": Grade(1.025, 1.060, 1.075, 0.010, cyan=0.006, sharpen=20),
        "ceralith-ovenable-tray.webp": Grade(1.020, 1.055, 1.060, 0.012, warmth=0.006, sharpen=18),
        "ceralith-prepared-food.webp": Grade(1.020, 1.050, 1.055, 0.010, warmth=0.004, sharpen=18),
        "bioma-fast-food-wrap.webp": Grade(1.020, 1.055, 1.070, 0.010, green=0.004, warmth=0.004, sharpen=18),
        "bioma-fried-food.webp": Grade(1.018, 1.050, 1.060, 0.012, green=0.003, warmth=0.004, sharpen=18),
        "bioma-bakery-bag.webp": Grade(1.020, 1.055, 1.065, 0.010, green=0.004, warmth=0.005, sharpen=18),
        "bioma-snack-pack.webp": Grade(1.020, 1.055, 1.065, 0.010, green=0.004, warmth=0.003, sharpen=18),
        "bioma-butter-wrap.webp": Grade(1.030, 1.045, 1.045, 0.008, warmth=0.004, sharpen=16),
        "bioma-fibre-takeaway.webp": Grade(1.020, 1.055, 1.065, 0.010, green=0.003, warmth=0.003, sharpen=18),
        "platform-people-collaboration.webp": Grade(1.035, 1.060, 1.070, 0.014, cyan=0.003, warmth=0.003, sharpen=20),
    }
    for source_name, grade in grades.items():
        source = STORY_DIR / source_name
        target = STORY_DIR / source_name.replace(".webp", "-v2.webp")
        image = Image.open(source).convert("RGB")
        save_webp(grade_image(image, grade), target, 83)


def build_recorded_process_frames() -> None:
    """Re-extract compact process cards from published video masters.

    Crop boxes remove letterboxing or irrelevant motion while retaining only
    content that is visibly present in the selected source frame. The 720 px
    cards are deliberately bounded below the source's meaningful detail.
    """
    dtpaper_video = ROOT / "public" / "media" / "dtpaper-workflow.mp4"
    ceralith_video = ROOT / "public" / "media" / "ceralith-ovenable-demo.mp4"
    bioma_video = ROOT / "public" / "media" / "bioma-oil-barrier-occ.mp4"
    configs = {
        "dtpaper-step-print": {
            "video": dtpaper_video,
            "timestamp": 2.55,
            "card_box": (0, 180, 720, 720),
            "mobile_box": (0, 150, 720, 870),
            "grade": Grade(1.025, 1.045, 1.020, 0.010, cyan=0.003, sharpen=18),
        },
        "dtpaper-step-powder": {
            "video": dtpaper_video,
            "timestamp": 11.20,
            "card_box": (0, 350, 720, 890),
            "mobile_box": (0, 290, 720, 1010),
            "grade": Grade(1.030, 1.045, 1.020, 0.012, cyan=0.003, sharpen=16),
        },
        "dtpaper-step-cure": {
            "video": dtpaper_video,
            "timestamp": 16.80,
            "card_box": (0, 160, 720, 700),
            "mobile_box": (0, 120, 720, 840),
            "grade": Grade(1.035, 1.050, 1.018, 0.012, cyan=0.003, sharpen=18),
        },
        "dtpaper-step-transfer": {
            "video": dtpaper_video,
            "timestamp": 23.60,
            "card_box": (0, 300, 720, 840),
            "mobile_box": (0, 180, 720, 900),
            "grade": Grade(1.025, 1.045, 1.025, 0.012, cyan=0.002, sharpen=17),
        },
        "ceralith-bakery-frame": {
            "video": ceralith_video,
            "timestamp": 0.00,
            "card_box": (0, 170, 576, 602),
            "mobile_box": (0, 120, 576, 696),
            "grade": Grade(1.025, 1.045, 1.025, 0.012, warmth=0.004, sharpen=16),
        },
        "ceralith-exposure-frame": {
            "video": ceralith_video,
            "timestamp": 20.667,
            "card_box": (0, 160, 576, 592),
            "mobile_box": (0, 120, 576, 696),
            "grade": Grade(1.025, 1.045, 1.020, 0.012, warmth=0.003, sharpen=16),
        },
        "bioma-untreated-occ-frame": {
            "video": bioma_video,
            "timestamp": 5.20,
            "card_box": (0, 0, 960, 720),
            "mobile_box": (90, 0, 810, 720),
            "grade": Grade(1.025, 1.045, 1.020, 0.010, green=0.002, warmth=0.003, sharpen=15),
        },
        "bioma-treated-structure-frame": {
            "video": bioma_video,
            "timestamp": 18.20,
            "card_box": (320, 0, 1280, 720),
            "mobile_box": (470, 0, 1190, 720),
            "grade": Grade(1.025, 1.045, 1.020, 0.010, green=0.002, warmth=0.003, sharpen=15),
        },
        "bioma-oil-application-frame": {
            "video": bioma_video,
            "timestamp": 10.40,
            "card_box": (320, 0, 1280, 720),
            "mobile_box": (470, 0, 1190, 720),
            "grade": Grade(1.025, 1.045, 1.020, 0.010, green=0.002, warmth=0.003, sharpen=15),
        },
        "bioma-comparison-frame": {
            "video": bioma_video,
            "timestamp": 49.40,
            "card_box": (160, 0, 1120, 720),
            "mobile_box": (280, 0, 1000, 720),
            "grade": Grade(1.025, 1.045, 1.020, 0.010, green=0.002, warmth=0.003, sharpen=15),
        },
    }

    for stem, config in configs.items():
        frame = grade_image(extract_frame(config["video"], config["timestamp"]), config["grade"])
        card = crop_box_to_size(frame, config["card_box"], (720, 540))
        mobile = crop_box_to_size(frame, config["mobile_box"], (480, 480))
        save_webp(card, STORY_DIR / f"{stem}-v2.webp", 86)
        save_webp(mobile, STORY_DIR / f"{stem}-mobile-v2.webp", 85)


def build_representative_resolution_restoration() -> None:
    """Restore Retina presentation without inventing representative content."""
    story_grades: dict[str, tuple[Grade, tuple[int, int]]] = {
        "ceralith-ovenable-tray.webp": (Grade(1.020, 1.055, 1.060, 0.012, warmth=0.006, sharpen=18), (1274, 746)),
        "ceralith-prepared-food.webp": (Grade(1.020, 1.050, 1.055, 0.010, warmth=0.004, sharpen=18), (1298, 866)),
        "bioma-fast-food-wrap.webp": (Grade(1.020, 1.055, 1.070, 0.010, green=0.004, warmth=0.004, sharpen=18), (996, 996)),
        "bioma-fried-food.webp": (Grade(1.018, 1.050, 1.060, 0.012, green=0.003, warmth=0.004, sharpen=18), (996, 996)),
        "bioma-bakery-bag.webp": (Grade(1.020, 1.055, 1.065, 0.010, green=0.004, warmth=0.005, sharpen=18), (996, 996)),
        "bioma-snack-pack.webp": (Grade(1.020, 1.055, 1.065, 0.010, green=0.004, warmth=0.003, sharpen=18), (996, 996)),
        "bioma-butter-wrap.webp": (Grade(1.030, 1.045, 1.045, 0.008, warmth=0.004, sharpen=16), (996, 996)),
        "bioma-fibre-takeaway.webp": (Grade(1.020, 1.055, 1.065, 0.010, green=0.003, warmth=0.003, sharpen=18), (996, 996)),
    }
    for source_name, (grade, target_size) in story_grades.items():
        source = Image.open(STORY_DIR / source_name).convert("RGB")
        restored = restore_resolution(grade_image(source, grade), target_size)
        save_webp(restored, STORY_DIR / source_name.replace(".webp", "-v3.webp"), 87)

    process_grades: dict[str, Grade] = {
        "home-process-material-challenge-v2.webp": Grade(1.040, 1.080, 1.10, 0.012, cyan=0.003, warmth=0.004, sharpen=24),
        "home-process-chemistry-substrate-v2.webp": Grade(1.055, 1.070, 1.08, 0.012, cyan=0.008, sharpen=23),
        "home-process-coating-application-v2.webp": Grade(1.035, 1.085, 1.12, 0.012, cyan=0.003, green=0.008, sharpen=24),
        "home-process-validation-v2.webp": Grade(1.045, 1.075, 1.09, 0.015, warmth=0.008, sharpen=22),
        "home-process-industrial-scale-v2.webp": Grade(1.035, 1.090, 1.10, 0.014, cyan=0.005, green=0.004, warmth=0.003, sharpen=24),
    }
    for source_name, grade in process_grades.items():
        source = Image.open(HOME_DIR / source_name).convert("RGB")
        target_size = (source.width * 2, source.height * 2)
        restored = restore_resolution(grade_image(source, grade), target_size)
        save_webp(restored, HOME_DIR / source_name.replace("-v2.webp", "-v4.webp"), 86)


if __name__ == "__main__":
    build_recorded_posters()
    build_representative_grades()
    build_story_representative_grades()
    build_recorded_process_frames()
    build_representative_resolution_restoration()
    print("Generated posters, colour grades, 20 recorded process variants and 13 Retina-safe representative restorations.")
