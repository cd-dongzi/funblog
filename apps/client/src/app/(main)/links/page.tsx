import { LINK_LIST } from '@funblog/constants';
import { LinkType } from '@funblog/types';
import { getListList, getSiteLink } from '@/api';
import { Banner } from '@/proComponents/Banner';
import List from './List';
import Registered from './Registered';

export const metadata = {
  title: '友情链接',
};

function getTitle(type: LinkType) {
  const o = LINK_LIST.find((v) => v.value === type);
  return o?.alias || o?.label || '';
}
async function Links() {
  const [list, siteLink] = await Promise.all([getListList(), getSiteLink()]);
  return (
    <>
      <Banner image="/links.jpg" title="友情链接"></Banner>
      <div className="page-main">
        {list.map((item) => (
          <List key={item.type} title={getTitle(item.type)} list={item.list} />
        ))}
        <Registered siteLink={siteLink} />
      </div>
    </>
  );
}

export default Links;
