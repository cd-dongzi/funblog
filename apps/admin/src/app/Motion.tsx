'use client';

import { LazyMotion } from 'framer-motion';

const loadFeatures = () => import('@/utils/features').then((res) => res.default);

function Motion({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

export default Motion;
