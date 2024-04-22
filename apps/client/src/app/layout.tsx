import '@/styles/index.css';
import { SvgContainer } from '@funblog/components';
import type { Metadata } from 'next';
// import Script from 'next/script';
import { getSiteMeta, getSvgList } from '@/api';
import { getResourceUrl } from '@/utils';
import Body from './Body';
import Html from './Html';
import StaticData from './StaticData';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteMeta();
  return {
    title: data?.title,
    keywords: data?.keywords,
    description: data?.description,
  };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const list = await getSvgList();
  return (
    <Html>
      {/* <Script src="https://apis.google.com/js/platform.js" async /> */}
      <StaticData>
        {(props) => (
          <>
            <link rel="icon" href={getResourceUrl(props.siteMeta?.favicon)} />
            <Body globalProps={props} helperProps={{ serverUrl: process.env.SERVER_URL }}>
              <SvgContainer list={list} />
              {children}
            </Body>
          </>
        )}
      </StaticData>
    </Html>
  );
}
