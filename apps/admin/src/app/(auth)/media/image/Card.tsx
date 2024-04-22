import { Image } from '@funblog/types';
import PreviewImage, { PreviewImageProps } from '@/components/PreviewImage';
import { getResourceUrl } from '@/utils';

function Card({ item, ...props }: { item: Image } & Pick<PreviewImageProps, 'onRemove' | 'onDetail'>) {
  return (
    <div className="relative w-full pt-[100%]">
      <PreviewImage
        showDetail
        showClose
        className="absolute bottom-0 left-0 right-0 top-0 p-3"
        src={getResourceUrl(item.url)}
        {...props}
      />
    </div>
  );
}

export default Card;
