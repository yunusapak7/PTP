import biomaPoster from "../../../assets/posters/bioma-oil-barrier-occ-poster.webp?inline";
import biomaPosterV2 from "../../../assets/posters/bioma-oil-barrier-occ-poster-v2.webp?inline";
import biomaPosterMobileV2 from "../../../assets/posters/bioma-oil-barrier-occ-poster-mobile-v2.webp?inline";
import biomaPosterModalV2 from "../../../assets/posters/bioma-oil-barrier-occ-poster-modal-v2.webp?inline";
import biomaPosterThumbnailV2 from "../../../assets/posters/bioma-oil-barrier-occ-poster-thumbnail-v2.webp?inline";
import ceralithPoster from "../../../assets/posters/ceralith-ovenable-demo-poster.webp?inline";
import ceralithPosterV2 from "../../../assets/posters/ceralith-ovenable-demo-poster-v2.webp?inline";
import ceralithPosterMobileV2 from "../../../assets/posters/ceralith-ovenable-demo-poster-mobile-v2.webp?inline";
import ceralithPosterModalV2 from "../../../assets/posters/ceralith-ovenable-demo-poster-modal-v2.webp?inline";
import ceralithPosterThumbnailV2 from "../../../assets/posters/ceralith-ovenable-demo-poster-thumbnail-v2.webp?inline";
import dtpaperPoster from "../../../assets/posters/dtpaper-workflow-poster.webp?inline";
import dtpaperPosterV2 from "../../../assets/posters/dtpaper-workflow-poster-v2.webp?inline";
import dtpaperPosterMobileV2 from "../../../assets/posters/dtpaper-workflow-poster-mobile-v2.webp?inline";
import dtpaperPosterModalV2 from "../../../assets/posters/dtpaper-workflow-poster-modal-v2.webp?inline";
import dtpaperPosterThumbnailV2 from "../../../assets/posters/dtpaper-workflow-poster-thumbnail-v2.webp?inline";

const posters: Record<string, string> = {
  "bioma-oil-barrier-occ-poster.webp": biomaPoster,
  "bioma-oil-barrier-occ-poster-v2.webp": biomaPosterV2,
  "bioma-oil-barrier-occ-poster-mobile-v2.webp": biomaPosterMobileV2,
  "bioma-oil-barrier-occ-poster-modal-v2.webp": biomaPosterModalV2,
  "bioma-oil-barrier-occ-poster-thumbnail-v2.webp": biomaPosterThumbnailV2,
  "ceralith-ovenable-demo-poster.webp": ceralithPoster,
  "ceralith-ovenable-demo-poster-v2.webp": ceralithPosterV2,
  "ceralith-ovenable-demo-poster-mobile-v2.webp": ceralithPosterMobileV2,
  "ceralith-ovenable-demo-poster-modal-v2.webp": ceralithPosterModalV2,
  "ceralith-ovenable-demo-poster-thumbnail-v2.webp": ceralithPosterThumbnailV2,
  "dtpaper-workflow-poster.webp": dtpaperPoster,
  "dtpaper-workflow-poster-v2.webp": dtpaperPosterV2,
  "dtpaper-workflow-poster-mobile-v2.webp": dtpaperPosterMobileV2,
  "dtpaper-workflow-poster-modal-v2.webp": dtpaperPosterModalV2,
  "dtpaper-workflow-poster-thumbnail-v2.webp": dtpaperPosterThumbnailV2,
};

function decodeDataUrl(dataUrl: string) {
  const encoded = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const poster = posters[name];

  if (!poster) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(decodeDataUrl(poster), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/webp",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
