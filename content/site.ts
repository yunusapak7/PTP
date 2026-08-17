export const technologies = [
  { slug: "dtpaper", name: "DTPaper®", label: "Textile transition", title: "Paper instead of PET film in DTF printing.", summary: "A paper-based, PET-film-free and silicone-free transfer medium designed for Direct-to-Film textile printing.", features: ["Paper-based carrier", "PET-film-free", "Silicone-free", "Compatible with DTF workflow"], accent: "fibre" },
  { slug: "ceralith", name: "Ceralith™", label: "Ovenable packaging transition", title: "Mineral barrier instead of PET film.", summary: "A water-based mineral-reactive coating technology designed for ovenable paper and board applications without PET film.", features: ["PET-film-free target structure", "Zero-synthetic-polymer architecture", "PFAS-free formulation approach", "Heat resistant"], accent: "mineral" },
  { slug: "bioma-orx", name: "Bioma-ORX®", label: "Food packaging transition", title: "PFAS-free barrier technology for food packaging.", summary: "A water-based PFAS-free coating platform designed for oil, grease, moisture and selected liquid resistance on paper and board.", features: ["PFAS-free", "Water-based", "Adjustable barrier performance", "Industrial coating scalability"], accent: "barrier" },
] as const;

export type EvidenceStatus = "target-performance" | "under-validation" | "pilot-demonstrated" | "industrially-demonstrated" | "independently-verified" | "commercially-available";

export type DevelopmentStage = "Laboratory" | "Pilot" | "Industrial trial" | "Commercial application";
export type ConfidentialityStatus = "public-approved" | "restricted" | "confidential";
export type EvidenceRecord = {
  application: string;
  technology: string;
  developmentStage: DevelopmentStage;
  structure: string;
  context: string;
  testMethod: string;
  resultSummary: string;
  validationStatus: EvidenceStatus;
  date: string;
  source: string;
  confidentialityStatus: ConfidentialityStatus;
  publicationApproved: boolean;
};

export type GalleryRecord = {
  mediaType: "image" | "video";
  titleEn: string;
  titleTr: string;
  descriptionEn: string;
  descriptionTr: string;
  src: string;
  webmSrc?: string;
  mp4Src?: string;
  webmTrSrc?: string;
  mp4TrSrc?: string;
  mobileWebmSrc?: string;
  mobileMp4Src?: string;
  captionsEnSrc?: string;
  captionsTrSrc?: string;
  posterSrc?: string;
  mobilePosterSrc?: string;
  thumbnailPosterSrc?: string;
  modalPosterSrc?: string;
  posterWidth?: number;
  posterHeight?: number;
  mobilePosterWidth?: number;
  mobilePosterHeight?: number;
  posterTimestampSeconds?: number;
  width: number;
  height: number;
  altEn: string;
  altTr: string;
  captionEn: string;
  captionTr: string;
  applicationEn: string;
  applicationTr: string;
  technology: string;
  locationEn: string;
  locationTr: string;
  captureDate: string | null;
  developmentStage: DevelopmentStage;
  validationContextEn: string;
  validationContextTr: string;
  photographerOrSourceEn: string;
  photographerOrSourceTr: string;
  copyrightOwner: string;
  copyrightApproved: boolean;
  confidentialityApproved: boolean;
  personConsentApproved: boolean;
  technicalReviewApproved: boolean;
  publicationApproved: boolean;
  approvedBy: string | null;
  approvalDate: string | null;
  publicationNoteEn?: string;
  publicationNoteTr?: string;
  href?: string;
  event?: string;
  participatingOrganisation?: string;
};

export type HeroVideoRecord = {
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
  mobilePosterSrc: string;
  descriptiveTitle: string;
  source: string;
  captureDate: string;
  copyrightOwner: string;
  consentStatus: "not-applicable" | "obtained";
  confidentialityReview: "approved";
  publicationApproval: boolean;
};

export type ComparisonRecord = {
  title: string;
  before: GalleryRecord;
  after: GalleryRecord;
  substrate: string;
  coatingStructure: string;
  temperature: string;
  duration: string;
  exposureCondition: string;
  developmentStage: DevelopmentStage;
  validationStatus: EvidenceStatus;
  source: string;
  date: string;
  sameTestConditionsVerified: boolean;
  publicationApproval: boolean;
};

export type IndustrialParameter = {
  coatingMethod: string;
  verifiedWorkingWidth: string;
  supportedSubstrateCategories: string[];
  rollAndSheetCapability: string;
  status: "Pilot" | "Industrial";
  convertingProcesses: string[];
  qualityControlMethods: string[];
  verificationDate: string;
  approvedSource: string;
};

export const evidenceRecords: Record<(typeof technologies)[number]["slug"], EvidenceRecord[]> = { dtpaper: [], ceralith: [], "bioma-orx": [] };
const dtpaperWorkflowMedia: GalleryRecord = {
  mediaType: "video",
  titleEn: "DTPaper® Through the DTF Workflow",
  titleTr: "DTF İş Akışı Boyunca DTPaper®",
  descriptionEn: "Recorded process footage showing selected stages of printing, media handling, preparation and transfer within a DTF workflow.",
  descriptionTr: "DTF iş akışındaki baskı, medya hareketi, hazırlık ve transfer aşamalarından seçilmiş gerçek proses görüntüleri.",
  src: "/media/dtpaper-workflow.mp4",
  webmSrc: "/media/dtpaper-workflow.webm",
  mp4Src: "/media/dtpaper-workflow.mp4",
  webmTrSrc: "/media/dtpaper-workflow-tr.webm",
  mp4TrSrc: "/media/dtpaper-workflow-tr.mp4",
  captionsEnSrc: "/media/dtpaper-workflow-en.vtt",
  captionsTrSrc: "/media/dtpaper-workflow-tr.vtt",
  posterSrc: "/media/dtpaper-workflow-poster-v2.webp",
  mobilePosterSrc: "/media/dtpaper-workflow-poster-mobile-v2.webp",
  thumbnailPosterSrc: "/media/dtpaper-workflow-poster-thumbnail-v2.webp",
  modalPosterSrc: "/media/dtpaper-workflow-poster-modal-v2.webp",
  posterWidth: 1024,
  posterHeight: 576,
  mobilePosterWidth: 720,
  mobilePosterHeight: 900,
  posterTimestampSeconds: 16.8,
  width: 720,
  height: 1280,
  altEn: "Selected printing, media movement, preparation and heat-transfer stages in a DTPaper workflow.",
  altTr: "DTPaper iş akışındaki seçilmiş baskı, medya hareketi, hazırlık ve ısı transferi aşamaları.",
  captionEn: "Four selected process stages recorded in the DTF workflow.",
  captionTr: "DTF iş akışında kaydedilmiş dört seçilmiş proses aşaması.",
  applicationEn: "DTF textile transfer workflow",
  applicationTr: "DTF tekstil transfer iş akışı",
  technology: "DTPaper®",
  locationEn: "",
  locationTr: "",
  captureDate: null,
  developmentStage: "Pilot",
  validationContextEn: "Process documentation only; printer, ink, powder and textile compatibility are not asserted.",
  validationContextTr: "Yalnızca proses dokümantasyonudur; yazıcı, mürekkep, toz ve tekstil uyumluluğu iddia edilmemektedir.",
  photographerOrSourceEn: "Process footage supplied by Canapa Paper Technologies",
  photographerOrSourceTr: "Canapa Paper Technologies — sağlanan proses görüntüleri",
  copyrightOwner: "Canapa Paper Technologies",
  copyrightApproved: true,
  confidentialityApproved: true,
  personConsentApproved: true,
  technicalReviewApproved: true,
  publicationApproved: true,
  approvedBy: "Project media publication brief",
  approvalDate: "2026-08-13",
  href: "/en/technologies/dtpaper",
};

const ceralithDemonstrationMedia: GalleryRecord = {
  mediaType: "video",
  titleEn: "Ovenable Fibre Structure Demonstration",
  titleTr: "Fırınlanabilir Lif Yapısı Demonstrasyonu",
  descriptionEn: "A recorded application demonstration related to the development of ovenable paper and board structures without PET film.",
  descriptionTr: "PET film kullanılmadan fırınlanabilir kâğıt ve karton yapılar geliştirilmesine ilişkin kayıtlı uygulama demonstrasyonu.",
  src: "/media/ceralith-ovenable-demo.mp4",
  webmSrc: "/media/ceralith-ovenable-demo.webm",
  mp4Src: "/media/ceralith-ovenable-demo.mp4",
  mobileWebmSrc: "/media/ceralith-ovenable-demo-mobile.webm",
  mobileMp4Src: "/media/ceralith-ovenable-demo-mobile.mp4",
  captionsEnSrc: "/media/ceralith-ovenable-demo-en.vtt",
  captionsTrSrc: "/media/ceralith-ovenable-demo-tr.vtt",
  posterSrc: "/media/ceralith-ovenable-demo-poster-v2.webp",
  mobilePosterSrc: "/media/ceralith-ovenable-demo-poster-mobile-v2.webp",
  thumbnailPosterSrc: "/media/ceralith-ovenable-demo-poster-thumbnail-v2.webp",
  modalPosterSrc: "/media/ceralith-ovenable-demo-poster-modal-v2.webp",
  posterWidth: 1024,
  posterHeight: 576,
  mobilePosterWidth: 720,
  mobilePosterHeight: 900,
  posterTimestampSeconds: 0,
  width: 576,
  height: 1024,
  altEn: "Recorded handling demonstration of an ovenable fibre structure with food application.",
  altTr: "Gıda uygulamasında fırınlanabilir lif yapısının kayıtlı kullanım demonstrasyonu.",
  captionEn: "Application exploration footage; substrate, coating structure, temperature and duration are not published as verified evidence.",
  captionTr: "Uygulama araştırması görüntüsü; altlık, kaplama yapısı, sıcaklık ve süre doğrulanmış kanıt olarak yayımlanmamaktadır.",
  applicationEn: "Ovenable paper and board structure exploration",
  applicationTr: "Fırınlanabilir kâğıt ve karton yapı araştırması",
  technology: "Ceralith™",
  locationEn: "",
  locationTr: "",
  captureDate: null,
  developmentStage: "Pilot",
  validationContextEn: "Recorded application demonstration; not presented as certified or universal performance evidence.",
  validationContextTr: "Kayıtlı uygulama demonstrasyonudur; sertifikalı veya evrensel performans kanıtı olarak sunulmamaktadır.",
  photographerOrSourceEn: "Application footage supplied by Canapa Paper Technologies",
  photographerOrSourceTr: "Canapa Paper Technologies — sağlanan uygulama görüntüleri",
  copyrightOwner: "Canapa Paper Technologies",
  copyrightApproved: true,
  confidentialityApproved: true,
  personConsentApproved: true,
  technicalReviewApproved: true,
  publicationApproved: true,
  approvedBy: "Project media publication brief",
  approvalDate: "2026-08-13",
  publicationNoteEn: "This footage documents application exploration. Substrate, coating structure, temperature, duration and validation status require a separate approved technical record.",
  publicationNoteTr: "Bu görüntü uygulama araştırmasını belgelemektedir. Altlık, kaplama yapısı, sıcaklık, süre ve validasyon durumu ayrı bir onaylı teknik kayıt gerektirir.",
  href: "/en/technologies/ceralith",
};

const biomaBarrierMedia: GalleryRecord = {
  mediaType: "video",
  titleEn: "Oil Barrier Demonstration on OCC Paper",
  titleTr: "OCC Kâğıtta Yağ Bariyeri Demonstrasyonu",
  descriptionEn: "A comparative application demonstration showing uncoated OCC paper and a Bioma-ORX®-treated structure under the recorded test conditions.",
  descriptionTr: "Kaplanmamış OCC kâğıt ile Bioma-ORX® uygulanmış yapının kayıtlı test koşulları altındaki karşılaştırmalı uygulama demonstrasyonu.",
  src: "/media/bioma-oil-barrier-occ.mp4",
  webmSrc: "/media/bioma-oil-barrier-occ.webm",
  mp4Src: "/media/bioma-oil-barrier-occ.mp4",
  mobileWebmSrc: "/media/bioma-oil-barrier-occ-mobile.webm",
  mobileMp4Src: "/media/bioma-oil-barrier-occ-mobile.mp4",
  captionsEnSrc: "/media/bioma-oil-barrier-occ-en.vtt",
  captionsTrSrc: "/media/bioma-oil-barrier-occ-tr.vtt",
  posterSrc: "/media/bioma-oil-barrier-occ-poster-v2.webp",
  mobilePosterSrc: "/media/bioma-oil-barrier-occ-poster-mobile-v2.webp",
  thumbnailPosterSrc: "/media/bioma-oil-barrier-occ-poster-thumbnail-v2.webp",
  modalPosterSrc: "/media/bioma-oil-barrier-occ-poster-modal-v2.webp",
  posterWidth: 1280,
  posterHeight: 720,
  mobilePosterWidth: 720,
  mobilePosterHeight: 900,
  posterTimestampSeconds: 20.8,
  width: 1280,
  height: 720,
  altEn: "Side-by-side oil application demonstration on uncoated OCC paper and a Bioma-ORX treated sample.",
  altTr: "Kaplanmamış OCC kâğıt ile Bioma-ORX uygulanmış numune üzerinde yan yana yağ uygulama demonstrasyonu.",
  captionEn: "Comparative OCC application demonstration under the conditions recorded in the source footage.",
  captionTr: "Kaynak videoda kaydedilen koşullar altında karşılaştırmalı OCC uygulama demonstrasyonu.",
  applicationEn: "Oil-barrier demonstration on OCC paper",
  applicationTr: "OCC kâğıtta yağ bariyeri demonstrasyonu",
  technology: "Bioma-ORX®",
  locationEn: "",
  locationTr: "",
  captureDate: null,
  developmentStage: "Pilot",
  validationContextEn: "Comparative application demonstration; test liquid, quantity and substrate specification are not published as independently verified metadata.",
  validationContextTr: "Karşılaştırmalı uygulama demonstrasyonudur; test sıvısı, miktarı ve altlık spesifikasyonu bağımsız doğrulanmış metadata olarak yayımlanmamaktadır.",
  photographerOrSourceEn: "Demonstration footage supplied by Canapa Paper Technologies",
  photographerOrSourceTr: "Canapa Paper Technologies — sağlanan demonstrasyon görüntüleri",
  copyrightOwner: "Canapa Paper Technologies",
  copyrightApproved: true,
  confidentialityApproved: true,
  personConsentApproved: true,
  technicalReviewApproved: true,
  publicationApproved: true,
  approvedBy: "Project media publication brief",
  approvalDate: "2026-08-13",
  publicationNoteEn: "This material documents an application demonstration under the stated conditions. It does not constitute independent certification or universal performance evidence.",
  publicationNoteTr: "Bu materyal, belirtilen koşullardaki bir uygulama demonstrasyonunu belgelemektedir. Bağımsız sertifikasyon veya tüm uygulamalar için geçerli performans kanıtı değildir.",
  href: "/en/technologies/bioma-orx",
};

export const galleryRecords: Record<(typeof technologies)[number]["slug"] | "industrial-scale", GalleryRecord[]> = { dtpaper: [dtpaperWorkflowMedia], ceralith: [ceralithDemonstrationMedia], "bioma-orx": [biomaBarrierMedia], "industrial-scale": [] };
export const technologyHeroMediaRecords: Record<(typeof technologies)[number]["slug"] | "industrial-scale", GalleryRecord[]> = { dtpaper: [], ceralith: [], "bioma-orx": [], "industrial-scale": [] };
export const platformMediaRecords: GalleryRecord[] = [];
export const globalHubMediaRecords: GalleryRecord[] = [];
export const ceralithComparisonRecords: ComparisonRecord[] = [];
export const homeHeroVideo: HeroVideoRecord | null = null;
export const industrialParameters: IndustrialParameter[] = [];

export const technologyDetails = {
  dtpaper: {
    maturity: "Pilot / industrial development",
    status: "under-validation" as EvidenceStatus,
    targetApplication: "Direct-to-Film textile transfer workflows",
    context: "Application trials across printing, powdering, fixation and transfer stages",
    evidence: "Evidence available upon technical review",
    capabilities: ["Ink acceptance and image definition", "Hot-melt powder retention", "Fixation-temperature stability", "Image transfer performance", "Controlled release after transfer", "Colour, flexibility, hand feel and wash-performance considerations"],
    applications: ["Print-on-demand textiles", "Promotional textiles", "Personalised garments", "Fashion and sportswear", "DTF printing centres", "OEM and consumables ecosystems"],
    collaboration: ["Direct product supply", "Distribution partnerships", "OEM collaboration", "Regional production", "Technology licensing"],
    applicationNote: "DTPaper® performance depends on the selected printer, ink, hot-melt powder, curing profile, textile type, transfer temperature, pressure and washing protocol. Compatibility and final performance must be validated for each production workflow.",
  },
  ceralith: {
    maturity: "Pilot / application development",
    status: "under-validation" as EvidenceStatus,
    targetApplication: "Ovenable fibre-based packaging without PET film",
    context: "Selected high-temperature paper and board structures",
    evidence: "Source-approved test conditions and performance data are available upon technical review",
    capabilities: ["Heat resistance", "Oil and grease resistance", "Coating integrity", "Glueability", "Printing and converting compatibility", "Final food-contact structure requirements"],
    applications: ["Ovenable paperboard trays", "Prepared-meal packaging", "Pizza and bakery boards", "Frozen ovenable products", "Food-service board", "Selected baking-paper structures", "Other selected high-temperature fibre applications"],
    collaboration: ["Application development", "Converter collaboration", "Regional production", "Technology licensing", "Strategic partnerships"],
    applicationNote: "Ceralith™ performance depends on the selected paper or board, coating weight, drying and reaction conditions, converting configuration, food type, heating temperature and duration. Food-contact, migration, recyclability and end-use compliance must be validated on the final structure for the intended market.",
  },
  "bioma-orx": {
    maturity: "Pilot / industrial application development",
    status: "under-validation" as EvidenceStatus,
    targetApplication: "Adjustable PFAS-free barrier systems for paper and board",
    context: "Substrate- and end-use-specific coating and converting trials",
    evidence: "Evidence available upon technical review",
    capabilities: ["Oil and grease barrier", "Moisture management", "Adjustable barrier performance", "Substrate-specific formulation", "Printing compatibility", "Cutting, folding and glueability", "Industrial coating scalability"],
    applications: ["Burger, sandwich and wrap papers", "French-fries and fried-food packaging", "Butter and fatty dairy-product papers", "Pizza and bakery boxes", "Takeaway and delivery packaging", "Food-service boards", "Corrugated liners", "Grease-resistant box interiors", "Selected paper and board structures"],
    collaboration: ["Chemical package", "Application development", "Industrial validation", "Regional production", "Technology licensing"],
    applicationNote: "Bioma-ORX® performance depends on the substrate, coating weight, oil and moisture exposure, food type, service temperature, storage period, printing and converting conditions. Food-contact, migration, barrier and application-specific claims must be validated on the final package structure.",
  },
} as const;

export const process = ["Material challenge", "Chemistry & material design", "Paper / substrate engineering", "Industrial coating", "Pilot & application testing", "Validation & certification", "Scale-up", "Licensing / production", "Global market"];

const baseInsightArticles = [
  { slug: "industrial-integration-problem", title: "Why Plastic-to-Paper Transformation Is an Industrial Integration Problem", category: "Platform thinking", intro: "A promising formulation becomes a viable material system only when chemistry, substrate, coating, converting and validation are engineered together.", technology: "The PTP platform", technologyHref: "/en/platform", sections: [
    ["The problem", "Material substitution is often framed as a search for a new coating or substrate. In practice, the decisive work begins after the first promising laboratory result."],
    ["The current industrial structure", "Chemistry developers, paper producers, coaters, converters, brands and regulatory teams frequently optimise different parts of the same structure without a shared development pathway."],
    ["The technical challenge", "A fibre structure must coat, dry, cure, print, convert and perform at production speed. A change in one layer can alter adhesion, barrier, release, heat response or machine behaviour elsewhere."],
    ["The PTP approach", "PTP starts with the final application and connects chemistry, substrate engineering, coating conditions, converting and commercialisation as one system."],
    ["Validation requirements", "Evidence must record the final structure, test conditions, process settings and intended market. Laboratory, pilot and industrial results should remain clearly differentiated."],
  ] },
  { slug: "hidden-plastic-carrier-dtf", title: "The Hidden Plastic Carrier in DTF Textile Printing", category: "Textile transition", intro: "The PET carrier at the centre of a fast-growing print workflow is easy to overlook—and technically demanding to replace.", technology: "Explore DTPaper®", technologyHref: "/en/technologies/dtpaper", sections: [
    ["The problem", "DTF printing transfers a printed image to a textile, but the carrier used through printing, powdering, curing and transfer is commonly a single-use PET film."],
    ["The current industrial structure", "The carrier is deeply integrated into established printers, inks, powders, ovens, presses and operator routines. A replacement cannot be evaluated as a sheet in isolation."],
    ["The technical challenge", "Paper must accept ink with image definition, retain hot-melt powder, remain stable at fixation temperature, transfer the image and release in a controlled way."],
    ["The PTP approach", "DTPaper® is developed as a transfer system for the complete DTF workflow, with paper engineering and surface chemistry considered alongside colour, flexibility, hand feel and wash performance."],
    ["Validation requirements", "Performance is application-specific and should be reviewed with the selected printer, ink, powder, curing profile, textile, press conditions and wash protocol."],
  ] },
  { slug: "pfas-free-industrial-packaging", title: "From PFAS-Free Chemistry to Industrial Food Packaging", category: "Barrier systems", intro: "Removing a chemistry is the beginning. The replacement must still survive coating, converting and the realities of the final application.", technology: "Explore Bioma-ORX®", technologyHref: "/en/technologies/bioma-orx", sections: [
    ["The problem", "Food-contact paper and board frequently need oil, grease, moisture or selected liquid resistance. Removing PFAS does not remove those functional requirements."],
    ["The current industrial structure", "Barrier chemistry is applied to many substrates and then printed, cut, folded, glued, filled and used under different exposure conditions."],
    ["The technical challenge", "Performance must be adjustable without losing coating integrity, converting compatibility or industrial runnability. One formulation level is unlikely to fit every structure."],
    ["The PTP approach", "Bioma-ORX® is positioned as a water-based, PFAS-free barrier platform tuned around substrate, exposure, coat weight and end use."],
    ["Validation requirements", "The finished package must be tested for the intended food type, temperature, duration, market and converting route. Food-contact status cannot be inferred from chemistry alone."],
  ] },
  { slug: "ovenable-paperboard-plastic-film", title: "Why Ovenable Paperboard Still Depends on Plastic Film", category: "Ovenable packaging", intro: "Heat resistance is only one part of replacing PET-laminated ovenable structures with a coated fibre system.", technology: "Explore Ceralith™", technologyHref: "/en/technologies/ceralith", sections: [
    ["The problem", "Many ovenable paperboard structures rely on PET film to provide heat and grease performance, creating a composite construction that can complicate fibre recovery."],
    ["The current industrial structure", "PET-laminated board is converted into trays and other formats that must survive forming, filling, transport, heating and food exposure."],
    ["The technical challenge", "A coating-led route must manage heat resistance, oil and grease, coating integrity, glueability, printing, conversion and the requirements of the final food-contact structure together."],
    ["The PTP approach", "Ceralith™ is a water-based mineral-reactive coating technology designed to explore ovenable fibre structures without PET film."],
    ["Validation requirements", "Test temperature, duration, food simulant or product, substrate, coat weight and converting configuration must be recorded and approved before numerical performance is published."],
  ] },
] as const;

const articleSections = {
  "industrial-integration-problem": [
    ["Executive summary", "Plastic-to-paper transition is not a one-material substitution. It is a coordinated redesign of chemistry, fibre substrate, coating, drying, converting, quality control and the final application. A promising laboratory sample can fail when it meets production speed, storage, transport or regulatory review. A credible programme therefore defines the complete structure and the decision criteria before scale-up. PTP treats the interfaces between disciplines as the central technology-development task and keeps laboratory, pilot and industrial evidence clearly separated."],
    ["The material or application problem", "A plastic component often performs several functions at once: it may provide release, heat resistance, barrier, sealing, dimensional stability or a printable surface. Replacing it with paper changes more than the visible material. Fibre absorbs water, responds to heat and humidity, and varies with furnish, porosity and surface treatment. The development question is therefore not simply whether paper can replace plastic, but which fibre structure and functional treatment can provide the required performance through manufacturing and use without creating unsupported environmental or regulatory claims."],
    ["Why the current structure is used", "Existing structures are rarely accidental. They have been optimised around available machinery, established raw materials, predictable yields and familiar test methods. Operators understand their process windows, converters know how the materials fold or seal, and brands have approved specifications. Even an undesirable component may remain because it reduces operational risk. A replacement must address this accumulated industrial knowledge. Technical teams need to understand what the current layer does, where it fails, which tolerances matter and which changes the existing equipment can accept."],
    ["Why replacement is technically difficult", "Functions that appear independent are often coupled. Increasing coat weight may improve barrier but slow drying, increase blocking or change recyclability outcomes. A more porous paper may improve coating anchorage while increasing consumption. A formulation that performs in a flat laboratory specimen may crack after creasing or lose integrity during heat exposure. These interactions create a moving optimisation problem. Success depends on defining the minimum acceptable performance for the real application and testing the complete converted structure rather than presenting one favourable material result as universal proof."],
    ["Industrial integration requirements", "Integration begins with the target line: coating method, working width, web tension, drying capacity, application weight, roll handling and downstream converting. The programme should identify critical-to-quality variables and a realistic operating window, then connect them to incoming-material controls and finished-product checks. Pilot production is useful only when the trial records substrate identity, formulation version, machine settings and sampling points. Technology transfer also requires repeatable preparation instructions, safe handling information, change-control rules and a shared definition of what constitutes an acceptable production run."],
    ["Validation checklist", "A defensible record states the application, final material structure, development stage, test or demonstration context, method, result summary, date and evidence source. It also identifies whether the outcome is a target, under validation, demonstrated at pilot scale, demonstrated industrially, independently verified or commercially available. Food-contact, migration, recyclability and regulatory conclusions must be assessed on the final structure for its intended market. Numerical claims should not be published without approved source documentation, test conditions and a clear connection between the tested specimen and the public statement."],
    ["PTP’s development approach", "PTP starts with the material challenge and maps every function currently delivered by the incumbent structure. Chemistry and substrate work then proceed with the intended coating and converting route in view. Trials move through controlled gates: laboratory screening, pilot application, end-use testing, industrial demonstration and a suitable commercial pathway. The platform brings material developers, producers, converters, brands and validation specialists into one decision process. This reduces hand-off gaps and makes it easier to see which evidence is available, which remains conditional and what must be completed before scale-up."],
    ["Related technology", "The PTP platform applies this integration model across DTPaper®, Ceralith™ and Bioma-ORX®. Each pathway begins with a different application problem, but all require the same discipline: define the complete system, preserve traceability and validate claims in the final use configuration. Organisations can begin with an existing material, a production constraint or an unmet performance target. The first project step is to frame the structure, process, exposure and decision criteria precisely enough for a technically meaningful development and validation plan."],
  ],
  "hidden-plastic-carrier-dtf": [
    ["Executive summary", "Direct-to-Film textile printing transfers an image to fabric, yet the temporary carrier is commonly single-use PET film. Replacing that carrier with paper is not a simple sheet substitution because the medium participates in printing, powder application, curing, heat pressing and release. It must interact with a chosen printer, ink set, hot-melt powder and textile while maintaining image definition and process reliability. DTPaper® is therefore developed as a paper-based transfer system for the complete DTF workflow, with performance validated for each production configuration."],
    ["The material or application problem", "The carrier leaves the finished garment after transfer, so its material footprint can be overlooked by buyers focused on the printed textile. At the print operation, however, every image requires a stable temporary medium. A paper route must handle wet ink, powder deposition, thermal exposure and mechanical transport before releasing the image under controlled press conditions. Fibre selection, surface treatment and moisture response all influence that sequence. The relevant question is whether the complete workflow can run consistently, not whether one printed paper sample appears visually acceptable."],
    ["Why the current structure is used", "PET film offers a smooth, dimensionally stable surface with familiar release behaviour. Commercial printers, feed systems, powder shakers, curing units and heat presses have been tuned around its thickness, stiffness, friction and thermal response. Operators also rely on established hot- or cold-peel routines and known storage practices. This installed base explains why substitution is demanding: a paper carrier must work within existing production habits or provide a clearly manageable transition. Compatibility with one machine does not establish compatibility across the wider DTF equipment and consumables ecosystem."],
    ["Why replacement is technically difficult", "Paper is hydrophilic and naturally variable. Excessive ink penetration can reduce colour density or line definition, while insufficient anchorage can disturb the powder layer. Heat can drive moisture movement, curl, shrinkage or cockling, which affects registration and web handling. The carrier must then retain the adhesive system during curing but release the transferred image cleanly at the selected temperature and pressure. These properties are interdependent, and improvements in release may alter coating integrity or handling. Evaluation therefore needs an agreed printer-to-wash protocol rather than a single isolated result."],
    ["Industrial integration requirements", "A production review records printer model, ink chemistry, resolution, ink load, powder grade and application, curing temperature profile, dwell time, carrier conditioning and storage. Transfer validation adds textile composition, press temperature, pressure, duration and peel method. The workflow should also assess feeding, static behaviour, sheet or roll consistency, edge curl and operator handling. Repeatability across batches matters as much as an initial demonstration. If regional production or licensing is planned, raw-material specifications, coating controls and release testing must travel with the technology package."],
    ["Validation checklist", "Validation should include image definition, colour response, powder retention, curing stability, transfer completeness, release behaviour, hand feel, flexibility and wash performance using an identified protocol. Records must connect each result to the precise paper, coating version, printer, ink, powder, textile and press settings. Any claim about PET-film-free or silicone-free construction requires approved composition documentation. Status language should distinguish development targets from pilot demonstrations, industrial demonstrations, independent verification and commercial availability. Customer-specific results remain confidential unless both source and publication permission are explicit."],
    ["PTP’s development approach", "DTPaper® development begins by mapping the complete DTF workflow and the constraints of the intended user. Paper engineering and surface chemistry are tuned alongside printing and transfer trials, not handed off after formulation. Trial results are reviewed for the whole system, including image quality, operator handling and garment performance. Where a configuration is promising, the next gate expands repeatability, run length and batch controls. Collaboration may follow direct product supply, distribution, OEM alignment, regional production or technology licensing, depending on the verified manufacturing and application pathway."],
    ["Related technology", "DTPaper® is the PTP pathway focused on a paper-based, PET-film-free and silicone-free transfer system for DTF textile printing. Its public description deliberately avoids universal compatibility or performance claims because results depend on the selected printer, ink, hot-melt powder, curing profile, textile, transfer temperature, pressure and washing protocol. A qualified project begins by identifying that workflow and the success criteria. The resulting plan can then define samples, test conditions, evidence ownership and the steps needed to move from application trial to industrial adoption."],
  ],
  "pfas-free-industrial-packaging": [
    ["Executive summary", "Moving from PFAS-based grease resistance to PFAS-free paper packaging is a system-development challenge. The replacement coating must be compatible with the selected paper or board, industrial application method, drying capacity, printing and converting route. It must then perform for the actual food, temperature, contact time and storage conditions. Bioma-ORX® is positioned as an adjustable, water-based and PFAS-free barrier platform rather than a universal formulation. Every food-contact, migration, barrier, recyclability and regulatory statement must be validated on the final package structure for the intended market."],
    ["The material or application problem", "Food-service papers and boards encounter oils, grease, moisture and sometimes selected liquids under demanding conditions. A burger wrap, fried-food pack, butter paper and corrugated liner do not share the same exposure profile. Removing PFAS addresses a chemistry concern, but the package still has to contain the product, protect appearance, convert reliably and meet applicable food-contact requirements. Fibre porosity, sizing, surface energy and coat weight influence barrier formation. Development therefore starts with the food and service conditions, not with a claim that one chemistry fits every substrate."],
    ["Why the current structure is used", "Established grease-resistant structures can offer efficient performance at low application levels and are already embedded in mill, coater and converter specifications. Their behaviour through printing, cutting, folding, gluing and filling is familiar. Supply chains have approved test methods and quality thresholds around them. A PFAS-free route must replace both performance and predictability. It may also need to work across several paper grades or production sites. That makes process tolerance, storage stability and batch consistency essential parts of the value proposition, even when the public conversation focuses mainly on chemistry."],
    ["Why replacement is technically difficult", "Barrier performance emerges from the interaction between formulation and fibre surface. Pinholes, uneven holdout, fold cracking, glue interference or changes during ageing can undermine an initially strong flat-sheet result. Increasing barrier level may affect repulpability, print receptivity or drying demand. Moisture and grease tests can also produce different outcomes depending on method, temperature and contact duration. Because the finished package includes inks, adhesives and converted edges, chemistry-level information cannot establish food-contact or application compliance. The final structure must be assessed under its actual exposure and use scenario."],
    ["Industrial integration requirements", "Scale-up defines the supported substrate category, coating method, application weight, web speed, drying profile and quality-control checks. The team should review formulation preparation, filtration, viscosity control, foam management, coat-weight uniformity and roll storage. Downstream trials need printing, cutting, creasing, folding, gluing and packing conditions. A useful pilot run records the precise substrate, formulation batch, machine parameters, sampling plan and ageing interval. Production transfer adds incoming-material specifications, release criteria, deviation handling and traceable change control across each manufacturing location."],
    ["Validation checklist", "The validation plan identifies food type or simulant, contact area, temperature, duration, storage period and target market. It records the final paper or board, coating weight, printing and converting configuration. Barrier methods and acceptance thresholds should be agreed before testing. Food-contact and migration assessment must cover the final structure and relevant conditions of use. PFAS-free composition claims need a defined scope and approved supporting documentation. Public results require source, date, method and publication approval, while confidential customer trials should remain available only within qualified technical discussions."],
    ["PTP’s development approach", "Bioma-ORX® is developed by matching formulation level and coating architecture to the substrate and application exposure. Laboratory screening narrows candidates, pilot coating tests runnability and uniformity, and converted-package trials examine the final use. Evidence is assigned a transparent maturity status rather than presented as a broad commercial claim. PTP connects chemistry, paper, coating, converting and validation teams so that a change in one variable is reviewed across the system. Commercial pathways can include a chemical package, application development, industrial validation, regional production or licensing."],
    ["Related technology", "Bioma-ORX® is PTP’s adjustable water-based and PFAS-free barrier platform for oil, grease, moisture and selected liquid resistance on paper and board. It is relevant to selected wraps, fried-food packaging, bakery and pizza formats, food-service boards, liners and grease-resistant box interiors. Suitability is never inferred from the category alone. A project begins by defining substrate, coat weight, oil and moisture exposure, food type, service temperature, storage, printing and converting conditions, then builds a validation route for the complete package."],
  ],
  "ovenable-paperboard-plastic-film": [
    ["Executive summary", "Ovenable paperboard often uses PET film because the structure must tolerate heat, oils, converting and food exposure at the same time. Replacing the film with a coating is not solely a temperature-resistance exercise. The finished tray or board must form, print, glue, store, transport and heat without losing integrity. Ceralith™ is a water-based mineral-reactive coating technology designed to enable ovenable paper and board structures without PET film. All temperature, migration, food-contact, recyclability and end-use conclusions remain specific to the final validated structure."],
    ["The material or application problem", "A fibre-based pack can still contain a plastic film layer that is not obvious to the consumer. In ovenable structures, that layer may provide heat response, grease resistance and surface integrity, but it also creates a composite construction that can complicate fibre recovery. Removing it changes the way the board interacts with food, steam, oils and oven conditions. The development task is to preserve the functions needed by the application while building a structure that can be coated and converted reliably on an industrial route."],
    ["Why the current structure is used", "PET-laminated board has an established performance history and a familiar supply chain. Converters understand how it behaves during printing, cutting, creasing, forming and gluing. Food producers know the available formats, and testing programmes have been built around defined time and temperature profiles. The film also creates a relatively continuous surface that can tolerate demanding exposure. A coating-led alternative must demonstrate a comparable level of operational control for its intended use, not only reach an attractive laboratory result under a single heating condition."],
    ["Why replacement is technically difficult", "Heat is only one stress. Oils can penetrate defects, steam can affect the fibre interface, folds can crack the coating and adhesives may respond differently at converted seams. Substrate porosity and coat weight influence coverage, while drying and mineral reaction conditions affect integrity. The package may also experience freezing, chilled storage, transport vibration and reheating before disposal. These variables make headline temperature claims inadequate without duration, food or simulant, substrate, coating amount and package configuration. The complete food-contact structure needs application-specific assessment."],
    ["Industrial integration requirements", "Industrial development establishes paper or board specification, surface preparation, coating method, coat-weight range, drying and reaction window, roll or sheet handling and converting route. Pilot trials should monitor uniformity, pinholes, blocking, curl and mechanical response before and after creasing or forming. Printing and adhesive compatibility require separate checks. For scale transfer, formulation preparation, machine settings, quality-control methods and acceptance limits must be documented. The practical operating window is as important as peak performance because production must remain repeatable across runs and material batches."],
    ["Validation checklist", "The test plan records heating temperature and duration, food product or simulant, fill mass, package geometry, substrate, coating weight, drying conditions and converting configuration. It examines coating integrity, oil and grease resistance, leakage, dimensional response, glue seams and any application-specific safety criteria. Food-contact and migration work must address the final printed and converted structure for the target market. Recyclability conclusions require an appropriate protocol and stated scope. Numerical claims need traceable source records, test methods, dates and explicit publication approval."],
    ["PTP’s development approach", "Ceralith™ development starts from the ovenable application and maps the functions delivered by the existing laminate. Mineral-reactive coating design is then linked to the selected fibre substrate, application method, drying conditions and converter requirements. Laboratory work screens formulations; pilot work evaluates coverage and runnability; converted structures are tested in their intended heating context. Evidence is published only with approved conditions and maturity status. PTP coordinates application development, converter collaboration, regional production, technology licensing and strategic partnerships according to the verified route."],
    ["Related technology", "Ceralith™ is PTP’s coating pathway for selected ovenable paper and board structures without PET film. Potential application areas include selected trays, prepared-meal packaging, pizza and bakery boards, frozen ovenable formats, food-service board and other high-temperature fibre structures. Performance depends on the paper or board, coating weight, drying and reaction conditions, converting configuration, food type, heating temperature and duration. A technical project defines those variables first, then creates the evidence plan required for a credible industrial and market decision."],
  ],
} as const;

function wordCount(text: string) { return text.trim().split(/\s+/u).filter(Boolean).length; }
export function calculateReadingTime(parts: readonly string[], wordsPerMinute: number) { return Math.max(1, Math.ceil(wordCount(parts.join(" ")) / wordsPerMinute)); }

export const insightArticles = baseInsightArticles.map(article => {
  const readingTimeMinutes = calculateReadingTime([article.intro, ...articleSections[article.slug].flatMap(section => [section[0], section[1]])], 200);
  return ({
  ...article,
  published: "13 August 2026",
  updated: "13 August 2026",
  publishedIso: "2026-08-13",
  updatedIso: "2026-08-13",
  author: "PTP Technical Editorial Team",
  readingTimeMinutes,
  readingTime: `${readingTimeMinutes} min read`,
  metaDescription: article.intro,
  sections: articleSections[article.slug],
  });
});

export const nav = [
  ["Platform", "/en/platform"], ["Technologies", "/en/technologies"], ["How We Work", "/en/how-we-work"], ["Industrial Scale", "/en/industrial-scale"], ["Global Hub", "/en/global-hub"], ["Insights", "/en/insights"]
] as const;

export const disclaimer = "Performance depends on substrate, coating weight, process conditions, converting configuration and final end-use. Food-contact, regulatory, recyclability and application-specific claims must be validated on the final structure for the intended market and use.";
