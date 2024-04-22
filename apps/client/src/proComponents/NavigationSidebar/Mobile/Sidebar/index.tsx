import { PanelLine } from '@/components/Panel';
import { NAVIGATION_SLOT_ID } from '@/constants';
import { useStore } from '@/context';
import { RowCard } from '@/proComponents/PostCard';
import Navigation from './Navigation';
import { TITLE_HOT, TITLE_LATEST } from '../../contants';

function Sidebar({ onClose }: { onClose: () => void }) {
  const { latestPostList = [], popularPostList = [] } = useStore();
  return (
    <>
      <Navigation onClose={onClose} />
      <div id={NAVIGATION_SLOT_ID} />
      {!!popularPostList?.length && (
        <PanelLine title={TITLE_HOT}>
          {popularPostList.map((post) => (
            <RowCard key={post.id} post={post} onClick={onClose} />
          ))}
        </PanelLine>
      )}
      {!!latestPostList?.length && (
        <PanelLine title={TITLE_LATEST}>
          {latestPostList.map((post) => (
            <RowCard key={post.id} post={post} onClick={onClose} />
          ))}
        </PanelLine>
      )}
    </>
  );
}

export default Sidebar;
