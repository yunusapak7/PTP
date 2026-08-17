export type ClaimStatus = "verified" | "internal-estimate" | "application-specific" | "pending-validation" | "patent-pending" | "future-target";
export type Claim = { id: string; claim: string; category: string; source: string; status: ClaimStatus; publicApproved: boolean; requiresCitation: boolean; notes?: string };

export const claims: Claim[] = [
  { id: "platform-position", claim: "PTP is an independent international technology and collaboration platform.", category: "positioning", source: "Master build brief", status: "verified", publicApproved: true, requiresCitation: false },
  { id: "dtpaper-architecture", claim: "DTPaper is a paper-based, PET-film-free and silicone-free transfer medium designed for DTF printing.", category: "technology", source: "Master build brief", status: "application-specific", publicApproved: true, requiresCitation: false, notes: "Performance must be validated for each workflow." },
  { id: "ceralith-architecture", claim: "Ceralith is a water-based mineral-reactive coating technology designed for ovenable paper and board applications without PET film.", category: "technology", source: "Master build brief", status: "pending-validation", publicApproved: true, requiresCitation: false },
  { id: "bioma-architecture", claim: "Bioma-ORX is a water-based PFAS-free coating platform for paper and board.", category: "technology", source: "Master build brief", status: "application-specific", publicApproved: true, requiresCitation: false },
  { id: "coating-width", claim: "Industrial coating width of 320 cm.", category: "industrial", source: "Referenced but not supplied presentation", status: "pending-validation", publicApproved: false, requiresCitation: true },
  { id: "capacity", claim: "Annual capacity of 100 million square metres.", category: "industrial", source: "Referenced but not supplied presentation", status: "pending-validation", publicApproved: false, requiresCitation: true },
  { id: "dtpaper-recognition", claim: "DTPaper received a WTIN 2025 Sustainability Award.", category: "recognition", source: "Referenced in editing brief; award record not supplied", status: "pending-validation", publicApproved: false, requiresCitation: true },
  { id: "ceralith-patent", claim: "Ceralith is patent pending.", category: "intellectual-property", source: "No patent record supplied", status: "pending-validation", publicApproved: false, requiresCitation: true },
  { id: "corrugated-widths", claim: "Production is compatible with 250 cm and 280 cm corrugated lines.", category: "industrial", source: "Referenced in editing brief; technical record not supplied", status: "pending-validation", publicApproved: false, requiresCitation: true },
];

export const publicClaims = claims.filter((claim) => claim.publicApproved);
