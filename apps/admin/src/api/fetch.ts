import { TOKEN_KEY } from '@funblog/constants';
import { fetch as Fetch, cacheCookie, isDocument } from '@funblog/utils';
import { METADATA } from '@/config/metaData';
import { message } from '@/lib/EscapeAntd';

export const setTokenToHeader = (token?: string): Record<string, any> => {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const request = new Fetch({
  setPrefix: () => {
    if (!isDocument()) {
      return METADATA.serverUrl;
    }
    return '';
  },
  onError: (error) => {
    if (!isDocument()) return;
    message.error(error.message);
  },
  setHeader: async () => {
    if (!isDocument()) {
      const { cookies } = await import('next/headers');
      return {
        ...setTokenToHeader(cookies().get(TOKEN_KEY)?.value),
      };
    }
    return {
      ...setTokenToHeader(cacheCookie.get(TOKEN_KEY)),
    };
  },
});
