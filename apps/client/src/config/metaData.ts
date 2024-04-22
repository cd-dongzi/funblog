import { SiteMeta } from '@funblog/types';

const METADATA = {
  serverUrl: process.env.SERVER_URL || '',
  siteMeta: {} as Partial<SiteMeta>,
};

export const setMetaDataSiteMeta = (siteMeta?: Partial<SiteMeta>) => {
  METADATA.siteMeta = siteMeta || ({} as Partial<SiteMeta>);
};

export const setMetaDataServerUrl = (serverUrl?: string) => {
  METADATA.serverUrl = serverUrl || '';
};

export { METADATA };
