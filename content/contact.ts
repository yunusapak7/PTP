export type CorporateEmailConfig = {
  generalEnquiries?: string;
  technologyProjects?: string;
  licensingAndPartnerships?: string;
};

// CMS-ready content field. Leave values empty to hide the public email card.
export const corporateEmail: CorporateEmailConfig = {
  generalEnquiries: "",
  technologyProjects: "",
  licensingAndPartnerships: "",
};
