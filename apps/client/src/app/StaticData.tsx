import {
  getTagList,
  getPageMenuNavigationList,
  getSiteBlogger,
  getSiteMeta,
  getSitePagination,
  getSiteUsr,
  getSocialAccount,
  getPopularPostList,
  getLatestPostList,
  getSiteComment,
  getSiteLayout,
} from '@/api';
import { setMetaDataSiteMeta } from '@/config/metaData';
import { GlobalContextProps } from '@/context/global/context';

async function StaticData({ children }: { children: (params: GlobalContextProps) => React.ReactNode }) {
  const promises: { key: keyof GlobalContextProps; request: Promise<any> }[] = [
    // 站点信息
    {
      key: 'siteMeta',
      request: getSiteMeta(),
    },
    // 博主信息
    {
      key: 'siteBlogger',
      request: getSiteBlogger(),
    },
    // 分页信息
    {
      key: 'sitePagination',
      request: getSitePagination(),
    },
    // 评论
    {
      key: 'siteComment',
      request: getSiteComment(),
    },
    // 社交账号
    {
      key: 'siteSocialAccount',
      request: getSocialAccount(),
    },
    // 用户设置
    {
      key: 'siteUser',
      request: getSiteUsr(),
    },
    // 布局设置
    {
      key: 'siteLayout',
      request: getSiteLayout(),
    },
    // 导航列表
    { key: 'navigationList', request: getPageMenuNavigationList() },
    // 标签列表
    {
      key: 'tagList',
      request: getTagList(),
    },
    // 最受欢迎文章
    {
      key: 'popularPostList',
      request: getPopularPostList(),
    },
    // 最新文章
    {
      key: 'latestPostList',
      request: getLatestPostList(),
    },
  ];
  const data = (await Promise.all(promises.map((item) => item.request))).reduce((obj, item, index) => {
    obj[promises[index].key] = item;
    return obj;
  }, {}) as Omit<GlobalContextProps, 'pc'>;
  setMetaDataSiteMeta(data.siteMeta);
  return (
    <>
      {children({
        ...data,
      })}
    </>
  );
}

export default StaticData;
