import { Suspense } from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
