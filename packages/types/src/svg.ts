export enum SvgScope {
  CLIENT = 'client',
  ADMIN = 'admin',
}
export interface Svg {
  id: number;
  content: string;
  name: string;
  scope?: SvgScope[];
  desc?: string;
}
