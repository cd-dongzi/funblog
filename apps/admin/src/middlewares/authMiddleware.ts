import { TOKEN_KEY } from '@funblog/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PAGE_WHITELIST } from '@/constants';
import { MiddlewareFactory } from './types';
import { METADATA } from '../config/metaData';

async function req(url: string, data?: Record<string, any>) {
  const res = await fetch(`${METADATA.serverUrl}${url}`, {
    method: 'post',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await res.json()).data;
}

export const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    if (!/^\/((?!api|static|.*\\..*|_next).*)$/.test(request.nextUrl.pathname)) {
      return next(request, _next);
    }
    if (PAGE_WHITELIST.includes(request.nextUrl.pathname)) {
      return next(request, _next);
    }
    const cookie = request.cookies.get(TOKEN_KEY);
    const token = cookie?.value;
    // 不要用自定义的fetch, 这块打包会有问题
    const uid = await req('/api/user-check', { token });
    if (uid) {
      const pass = await req(`/api/user/${uid}/allow-login-admin`);
      if (pass) {
        return next(request, _next);
      }
    }
    const url = new URL('/login', request.url);
    url.searchParams.set('redirectUrl', `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(url);
  };
};
