import { PanelLine } from '@/components/Panel';
import { PostCatalog, usePostCatalog, ChangeEventData } from '@/proComponents/PostCatalog';
import { MARKDOWN_CONTENT_ID } from '../constants';

export type { ChangeEventData };

function Sidebar({
  onChange,
  getSideBarContainer,
}: {
  onChange?: (data: ChangeEventData) => void;
  getSideBarContainer?: () => HTMLElement;
}) {
  const { catalogs, activeIndex, setActiveIndex } = usePostCatalog({
    id: MARKDOWN_CONTENT_ID,
  });
  const _onChange = async (data: ChangeEventData) => {
    await onChange?.(data);
    setActiveIndex(data.i);
  };
  return (
    <PanelLine title="文章目录">
      <PostCatalog
        list={catalogs}
        activeIndex={activeIndex}
        onChange={_onChange}
        getSideBarContainer={getSideBarContainer}
      />
    </PanelLine>
  );
}

export default Sidebar;
