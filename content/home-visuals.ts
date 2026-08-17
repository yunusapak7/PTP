export type HomeVisualSourceClass =
  | "recorded-process"
  | "recorded-demonstration"
  | "representative-application"
  | "supplied-rd-photography"
  | "licensed-photography"
  | "ai-generated-representative-image"
  | "verified-primary-record";

export type HomeVisual = {
  id: string;
  src: string;
  width: number;
  height: number;
  sourceClass: HomeVisualSourceClass;
  sourceLabelEn: string;
  sourceLabelTr: string;
  sourceNoteEn: string;
  sourceNoteTr: string;
  licenceStatus: string;
  requiresExternalLicenceVerification: boolean;
  evidenceRole: "representative-only" | "documentary-record";
  purpose: string;
  crop: string;
  usage: string;
  altEn: string;
  altTr: string;
};

const aiLabelEn = "AI-generated representative image";
const aiLabelTr = "Yapay zekâyla oluşturulmuş temsili görsel";
const aiNoteEn = "Representative visualisation only; not evidence of a PTP or Canapa project, facility, test or result.";
const aiNoteTr = "Yalnızca temsili görselleştirmedir; bir PTP veya Canapa projesi, tesisi, testi ya da sonucunun kanıtı değildir.";

function aiVisual(input: Omit<HomeVisual, "sourceClass" | "sourceLabelEn" | "sourceLabelTr" | "sourceNoteEn" | "sourceNoteTr" | "licenceStatus" | "requiresExternalLicenceVerification" | "evidenceRole">): HomeVisual {
  return {
    ...input,
    sourceClass: "ai-generated-representative-image",
    sourceLabelEn: aiLabelEn,
    sourceLabelTr: aiLabelTr,
    sourceNoteEn: aiNoteEn,
    sourceNoteTr: aiNoteTr,
    licenceStatus: "Generated for this project with the built-in image-generation tool; no external stock source used.",
    requiresExternalLicenceVerification: false,
    evidenceRole: "representative-only",
  };
}

function suppliedRepresentative(input: Omit<HomeVisual, "sourceClass" | "sourceLabelEn" | "sourceLabelTr" | "sourceNoteEn" | "sourceNoteTr" | "licenceStatus" | "requiresExternalLicenceVerification" | "evidenceRole">): HomeVisual {
  return { ...input, sourceClass: "representative-application", sourceLabelEn: "Supplied representative image", sourceLabelTr: "Sağlanan temsili görsel", sourceNoteEn: "Supplied for this website as representative context; not presented as a verified Canapa facility, test or performance record.", sourceNoteTr: "Bu web sitesi için temsili bağlam olarak sağlanmıştır; doğrulanmış Canapa tesisi, testi veya performans kaydı olarak sunulmaz.", licenceStatus: "Supplied by the project owner for website publication.", requiresExternalLicenceVerification: false, evidenceRole: "representative-only" };
}

export const homeVisuals = {
  hero: suppliedRepresentative({
    id: "home-hero-plastic-crisis-v4",
    src: "/home-visuals/home-hero-plastic-crisis-v4.webp",
    width: 837,
    height: 577,
    purpose: "Homepage hero framing the urgency of plastic dependence before presenting PTP's paper-technology response.",
    crop: "Landscape impact visual with the raised hand and plastic field retained across responsive hero crops.",
    usage: "Homepage hero only.",
    altEn: "A raised hand emerging above a field of discarded plastic bottles beneath a stormy sky",
    altTr: "Fırtınalı bir gökyüzü altında atılmış plastik şişe yığınının üzerinde yükselen bir el",
  }),
  dtpaper: {
    id: "home-dtpaper-representative-v3",
    src: "/story/canapa-dtp-real.jpeg",
    width: 1200,
    height: 800,
    sourceClass: "supplied-rd-photography",
    sourceLabelEn: "Authentic Canapa application photograph",
    sourceLabelTr: "Gerçek Canapa uygulama fotoğrafı",
    sourceNoteEn: "Company-supplied DTF textile application photograph; used as application context, not as performance evidence.",
    sourceNoteTr: "Şirket tarafından sağlanan gerçek DTF tekstil uygulama fotoğrafı; performans kanıtı olarak değil uygulama bağlamı olarak kullanılır.",
    licenceStatus: "Supplied company photography with publication approval.",
    requiresExternalLicenceVerification: false,
    evidenceRole: "documentary-record",
    purpose: "Authentic DTPaper textile-transfer application context.",
    crop: "3:2 original; heat press, textile and Canapa identity retained.",
    usage: "Homepage DTPaper technology card only.",
    altEn: "Canapa-branded textile positioned on a real heat press during a DTF application",
    altTr: "Gerçek bir ısı presinde DTF uygulaması sırasında konumlandırılmış Canapa markalı tekstil",
  } satisfies HomeVisual,
  ceralith: aiVisual({
    id: "home-ceralith-representative-v3",
    src: "/home-visuals/home-ceralith-representative-v3.webp",
    width: 1672,
    height: 941,
    purpose: "Representative Ceralith ovenable fibre-structure application context.",
    crop: "16:9 master; moulded fibre edge remains visible at all card breakpoints.",
    usage: "Homepage Ceralith technology card only.",
    altEn: "An unbranded moulded fibre tray with a visible paper-fibre edge inside an oven",
    altTr: "Fırın içinde, kâğıt-lif kenarı açıkça görülen markasız kalıplanmış lif tepsi",
  }),
  biomaOrx: {
    id: "home-bioma-representative-v3",
    src: "/story/bioma-white-kraft-barrier-test.jpeg",
    width: 1200,
    height: 1600,
    sourceClass: "supplied-rd-photography",
    sourceLabelEn: "Recorded Canapa material comparison",
    sourceLabelTr: "Kaydedilmiş Canapa malzeme karşılaştırması",
    sourceNoteEn: "Authentic white-kraft oil-barrier comparison supplied by Canapa; explanatory test context, not independent certification.",
    sourceNoteTr: "Canapa tarafından sağlanan gerçek beyaz kraft yağ bariyeri karşılaştırması; bağımsız sertifikasyon değil, açıklayıcı test bağlamıdır.",
    licenceStatus: "Supplied company test photography with publication approval.",
    requiresExternalLicenceVerification: false,
    evidenceRole: "documentary-record",
    purpose: "Authentic Bioma-ORX material-comparison context.",
    crop: "Portrait source cropped to the comparison samples; handwritten labels retained where legible.",
    usage: "Homepage Bioma-ORX technology card only.",
    altEn: "White kraft paper samples photographed during an oil-barrier comparison",
    altTr: "Yağ bariyeri karşılaştırması sırasında fotoğraflanan beyaz kraft kâğıt numuneleri",
  } satisfies HomeVisual,
  materialChallenge: suppliedRepresentative({
    id: "home-process-material-challenge-v4",
    src: "/story/home-material-challenge-analysis.webp",
    width: 3120,
    height: 1755,
    purpose: "Material challenge stage: analytical review and problem definition before development begins.",
    crop: "Wide laboratory analysis scene cropped responsively around the instrument and data overlays.",
    usage: "Homepage lab-to-scale stage 1 only.",
    altEn: "Laboratory instrument and analytical data used to frame a material-development challenge",
    altTr: "Malzeme geliştirme problemini tanımlamak için kullanılan laboratuvar cihazı ve analiz verileri",
  }),
  chemistrySubstrate: suppliedRepresentative({
    id: "home-process-chemistry-substrate-v4",
    src: "/story/home-chemistry-substrate-samples.webp",
    width: 3120,
    height: 1755,
    purpose: "Chemistry and substrate stage: liquid formulation and paper substrate interaction.",
    crop: "Wide laboratory close-up cropped around the formulation drops and substrate strip.",
    usage: "Homepage lab-to-scale stage 2 only.",
    altEn: "Gloved hands applying coloured formulation samples to a substrate strip",
    altTr: "Bir altlık şeridine renkli formülasyon numuneleri uygulayan eldivenli eller",
  }),
  coatingApplication: suppliedRepresentative({
    id: "home-process-coating-application-v4",
    src: "/story/home-coating-application-pilot.webp",
    width: 3120,
    height: 1755,
    purpose: "Coating and application stage: pilot formulation and process equipment used during application development.",
    crop: "Wide pilot-equipment photograph cropped around the process vessels and operator interaction.",
    usage: "Homepage lab-to-scale stage 3 only.",
    altEn: "Pilot formulation and process equipment used for coating application development",
    altTr: "Kaplama uygulaması geliştirmede kullanılan pilot formülasyon ve proses ekipmanı",
  }),
  validation: suppliedRepresentative({
    id: "home-process-validation-v4",
    src: "/story/home-validation-otr.webp",
    width: 1020,
    height: 1020,
    purpose: "Validation stage: close inspection of a fibre-based sample without a claimed result.",
    crop: "Square crop from a purpose-built six-panel process board.",
    usage: "Homepage lab-to-scale stage 4 only.",
    altEn: "Laboratory oxygen-transmission test equipment beside a flexible packaging sample",
    altTr: "Esnek ambalaj numunesinin yanında laboratuvar oksijen geçirgenliği test ekipmanı",
  }),
  industrialScale: suppliedRepresentative({
    id: "home-process-industrial-scale-v4",
    src: "/story/home-substrate-paper-roll.webp",
    width: 3120,
    height: 1755,
    purpose: "Industrial-scale stage: paper-roll production and material inspection in a mill environment.",
    crop: "Wide industrial photograph cropped around the paper roll and operator.",
    usage: "Homepage lab-to-scale stage 5 only.",
    altEn: "A paper-mill operator inspecting a large paper roll during industrial production",
    altTr: "Endüstriyel üretim sırasında büyük bir kâğıt rulosunu inceleyen kâğıt fabrikası çalışanı",
  }),
  integration: {
    id: "home-integration-representative-v3",
    src: "/story/canapa-innovation-center.webp",
    width: 3120,
    height: 1755,
    sourceClass: "supplied-rd-photography",
    sourceLabelEn: "Canapa R&D photography",
    sourceLabelTr: "Canapa Ar-Ge fotoğrafı",
    sourceNoteEn: "Authentic Canapa Innovation Center photograph. A separate real collaboration photograph is requested for the final version.",
    sourceNoteTr: "Gerçek Canapa Innovation Center fotoğrafı. Nihai sürüm için ayrıca gerçek bir ekip çalışması fotoğrafı talep edilmektedir.",
    licenceStatus: "Supplied company photography with publication approval.",
    requiresExternalLicenceVerification: false,
    evidenceRole: "documentary-record",
    purpose: "Authentic R&D context for the platform-integration section.",
    crop: "3:2 documentary photograph; specialist and technical bench retained.",
    usage: "Homepage integration section only.",
    altEn: "Laboratory specialist working with material samples in the Canapa Innovation Center",
    altTr: "Canapa Innovation Center laboratuvarında malzeme numuneleriyle çalışan uzman",
  } satisfies HomeVisual,
  recognition: {
    id: "canapa-award-certificate-2025",
    src: "/story/canapa-award-certificate-2025.webp",
    width: 1500,
    height: 1061,
    sourceClass: "verified-primary-record",
    sourceLabelEn: "Verified primary record",
    sourceLabelTr: "Doğrulanmış birincil kayıt",
    sourceNoteEn: "Certificate supplied as the primary recognition record; the award belongs to Canapa, not directly to PTP.",
    sourceNoteTr: "Birincil takdir kaydı olarak sağlanan sertifika; ödül doğrudan PTP'ye değil Canapa'ya aittir.",
    licenceStatus: "Supplied record with publication approval; retain attribution and factual context.",
    requiresExternalLicenceVerification: false,
    evidenceRole: "documentary-record",
    purpose: "Primary documentary record for the 2025 Canapa recognition.",
    crop: "Original certificate ratio retained; no decorative crop.",
    usage: "Homepage recognition section once only.",
    altEn: "Winner of Sustainability certificate presented to Canapa by WTiN Innovate Textile Awards, dated 5 December 2025",
    altTr: "WTiN Innovate Textile Awards tarafından Canapa'ya verilen 5 Aralık 2025 tarihli Sürdürülebilirlik Kazananı sertifikası",
  } satisfies HomeVisual,
} satisfies Record<string, HomeVisual>;

export const homeMotionClassifications = {
  "DTPaper®": {
    en: "Recorded process documentation",
    tr: "Kaydedilmiş proses dokümantasyonu",
  },
  "Ceralith™": {
    en: "Application exploration footage",
    tr: "Uygulama araştırma görüntüsü",
  },
  "Bioma-ORX®": {
    en: "Comparative application demonstration",
    tr: "Karşılaştırmalı uygulama demonstrasyonu",
  },
} as const;

export const homeVisualSourceLabels = {
  en: ["Recorded process", "Recorded demonstration", "Representative application", "Supplied R&D photography", "Licensed photography", aiLabelEn],
  tr: ["Kaydedilmiş proses", "Kaydedilmiş demonstrasyon", "Temsili uygulama", "Sağlanan Ar-Ge fotoğrafı", "Lisanslı fotoğraf", aiLabelTr],
} as const;
