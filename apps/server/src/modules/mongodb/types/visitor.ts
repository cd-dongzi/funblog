export interface Visitor {
  userAgent: string;
  ip: string;
  system: Record<string, any>;
  location: Record<string, any>;
  createTime: Date;
}
