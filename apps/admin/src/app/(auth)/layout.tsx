import { SvgContainer } from '@funblog/components';
import { TOKEN_KEY } from '@funblog/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSvgAdminList, getUserInfoByToken } from '@/api';
import { getPublicSiteMeta } from '@/api/site';
import ILayout from '@/components/Layout';
import { setMetaDataSiteMeta } from '@/config/metaData';
import GlobalData from './GlobalData';

export default async function Layout({ children }: { children: React.ReactNode }) {
  try {
    const token = cookies().get(TOKEN_KEY)?.value;
    const info = await getUserInfoByToken(token);
    const siteMeta = await getPublicSiteMeta();
    const svgList = await getSvgAdminList();
    setMetaDataSiteMeta(siteMeta);
    return (
      <>
        <SvgContainer list={svgList} />
        <GlobalData userInfo={info} siteMeta={siteMeta}>
          <ILayout>{children}</ILayout>
        </GlobalData>
      </>
    );
  } catch (e: any) {
    console.error(e?.message);
    return redirect('/login');
  }
}
