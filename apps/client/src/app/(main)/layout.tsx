import BackTop from '@/components/BackTop';
import Footer from '@/proComponents/Footer';
import GlobalData from '@/proComponents/GlobalData';
import LoginBtn from '@/proComponents/LoginBtn';
import DynamicLayout from './_layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicLayout footer={<Footer />}>
      <BackTop />
      <LoginBtn />
      {children}
      <GlobalData />
    </DynamicLayout>
  );
}
