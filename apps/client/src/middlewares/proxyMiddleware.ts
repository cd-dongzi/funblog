import { NextResponse, type NextRequest } from 'next/server';
import { METADATA } from '@/config/metaData';
import { MiddlewareFactory } from './types';

export const proxyMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    if (!/^\/api\/.*/.test(request.nextUrl.pathname)) {
      return next(request, _next);
    }
    const newUrl =
      request.nextUrl.pathname.replace(/^\/api/, `${METADATA.serverUrl}/api`) + (request.nextUrl.search || '');
    return NextResponse.rewrite(newUrl);
  };
};
