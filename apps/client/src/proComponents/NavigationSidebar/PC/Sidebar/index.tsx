import { PanelLine } from '@/components/Panel';
import { useStore } from '@/context';
import { RowCard } from '@/proComponents/PostCard';
import User from './User';
import Tags from '../../components/Tags';
import { TITLE_HOT, TITLE_LATEST, TITLE_TAG } from '../../contants';

function SideBar() {
  const { latestPostList = [], popularPostList = [], tagList } = useStore();
  return (
    <>
      <User />
      {false && !!tagList?.length && (
        <PanelLine title={TITLE_TAG}>
          <Tags />
        </PanelLine>
      )}
      {/* {!!siteSocialAccount?.links.length && (
        <PanelLine title={TITLE_USER}>
          <FollowMe />
        </PanelLine>
      )} */}
      {!!popularPostList?.length && (
        <PanelLine title={TITLE_HOT}>
          {popularPostList.map((post) => (
            <RowCard key={post.id} post={post} />
          ))}
        </PanelLine>
      )}
      {!!latestPostList?.length && (
        <PanelLine title={TITLE_LATEST}>
          {latestPostList.map((post) => (
            <RowCard key={post.id} post={post} />
          ))}
        </PanelLine>
      )}
    </>
  );
}

export default SideBar;
