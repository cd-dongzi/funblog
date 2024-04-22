import { Banner } from '@/proComponents/Banner';
import Forum from './Forum';
import Me from './Me';
import TechnologyStack from './TechnologyStack';

export const metadata = {
  title: '关于我',
};
function About() {
  return (
    <>
      <Banner image="/about.jpg" title="关于我" desc="写代码的铲屎官"></Banner>
      <div className="page-main">
        <Me />
        <Forum />
        <TechnologyStack />
      </div>
    </>
  );
}

export default About;
