export type LeadershipProfile = {
  fullName: string;
  role: string;
  organisation: string;
  photograph: string;
  photographAlt: string;
  shortBiography: string;
  technicalExpertise: string[];
  relevantExperience: string;
  approvedProfileUrl?: string;
  publicationApproved: boolean;
};

// Profiles remain hidden until all identity, image and publication fields are approved.
export const leadershipProfiles: LeadershipProfile[] = [];
