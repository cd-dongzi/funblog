import dynamic from 'next/dynamic';
import { LayoutProps } from './_layout';

const NoSSR = dynamic(() => import('./_layout'), { ssr: false });
function Layout(props: LayoutProps) {
  return <NoSSR {...props} />;
}

export default Layout;
