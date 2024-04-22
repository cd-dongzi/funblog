export interface Visitor {
  id: number;
  ip: string;
  userAgent?: string;
  country?: string;
  province?: string;
  city?: string;
  isp?: string;
  system?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
