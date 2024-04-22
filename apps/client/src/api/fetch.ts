import { TOKEN_KEY } from '@funblog/constants';
import { fetch as Fetch, cacheCookie, isDocument } from '@funblog/utils';
import { METADATA } from '@/config/metaData';

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
  setHeader: async () => {
    if (isDocument()) {
      return {
        ...setTokenToHeader(cacheCookie.get(TOKEN_KEY)),
      };
    }
    /* 
    cookies() 和 headers()：在服务器组件中使用它们将在请求时将整个路由选择为动态渲染。
    https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering
    */
    // const { cookies } = await import('next/headers');
    // return {
    //   ...setTokenToHeader(cookies().get(TOKEN_KEY)?.value),
    // };
  },
});
