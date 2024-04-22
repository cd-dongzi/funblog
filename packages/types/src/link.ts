export enum LinkStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}
export enum LinkType {
  PERSONAL_BLOG = 'personal-Blog',
  WEBSITE_COMMUNITY = 'websiteCommunity',
  PERSONAL_ONLINE = 'personalOnline',
  PERSONAL_RECOMMENDATION = 'personalRecommendation',
  RESOURCE_MATERIALS = 'resourceMaterials',
}

export interface Link {
  id: number;
  title: string;
  desc: string;
  url: string;
  logo: string;
  type: LinkType;
  visible: boolean;
  status: LinkStatus;
  createdAt: Date;
}
