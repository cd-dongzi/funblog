'use client';
import PageTransition from '@/components/PageTransition';
import { DISABLED_SUB_ROUTES } from '@/constants';
import { useStore } from '@/context';
import useMainHeight from '@/hooks/useMainHeight';
import Header from '@/proComponents/Header';
import { MNavigationSidebar, ChildrenParams } from '@/proComponents/NavigationSidebar';

function Main({
  children,
  className,
  headerClassName,
  style,
  footer,
  ...data
}: { children: React.ReactNode; footer: React.ReactNode } & ChildrenParams) {
  const { height } = useMainHeight();
  return (
    <>
      <Header {...data} className={headerClassName} />
      <main className={className} style={style}>
        <PageTransition disabledSubRoutes={DISABLED_SUB_ROUTES}>
          <div style={{ minHeight: height }} className="page relative pc:pb-12">
            {children}
          </div>
          {footer}
        </PageTransition>
      </main>
    </>
  );
}
export default function ILayout({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const { pc } = useStore();
  if (!pc) {
    return (
      <MNavigationSidebar>
        {(data) => (
          <>
            <Main {...data} footer={footer}>
              {children}
            </Main>
          </>
        )}
      </MNavigationSidebar>
    );
  }
  return (
    <>
      <Main footer={footer}>{children}</Main>
    </>
  );
}
