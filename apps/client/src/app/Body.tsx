'use client';

// import { LazyMotion } from 'framer-motion';
import { GlobalProvider, HelperProvider } from '@/context';
import { GlobalContextProps } from '@/context/global/context';
import { HelperContextProps } from '@/context/helper';

// const loadFeatures = () => import('@/utils/features').then((res) => res.default);

function Body({
  children,
  globalProps,
  helperProps,
}: { children: React.ReactNode } & {
  globalProps: GlobalContextProps;
  helperProps: HelperContextProps;
}) {
  return (
    <body className="text-sm text-text">
      <HelperProvider {...helperProps}>
        <GlobalProvider {...globalProps}>
          {/* <LazyMotion features={loadFeatures} strict> */}
          {children}
          {/* </LazyMotion> */}
        </GlobalProvider>
      </HelperProvider>
    </body>
  );
}

export default Body;
