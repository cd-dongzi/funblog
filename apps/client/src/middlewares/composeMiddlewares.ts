import { NextMiddleware, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';

export function composeMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = composeMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
