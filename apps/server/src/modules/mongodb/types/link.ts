export enum LinkStatus {
  REVIEW = 'REVIEW',
  SUCCESS = 'SUCCESS',
  REFUSE = 'REFUSE',
}

export interface Link {
  _id: string;
  title: string;
  url: string;
  desc: string;
  type: string;
  logo: string;
  isVisible: boolean;
  status: LinkStatus;
  userId?: string;
  refuseReason?: string;
}
