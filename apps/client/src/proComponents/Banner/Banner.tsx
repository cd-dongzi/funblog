import cls from 'classnames';

import { bubble } from './classNames';
import Bubble, { BubbleProps } from './components/Bubble';
import Card from './components/Card';
import Img from './components/Image';
function Banner({
  title,
  desc,
  image,
  className,
  direction,
}: {
  title: string;
  desc?: string;
  image?: string;
  className?: string;
} & Partial<Pick<BubbleProps, 'direction'>>) {
  return (
    <Card className={cls(className, '!h-[220px]')}>
      {image && <Img image={image} />}
      <Bubble className={bubble} direction={direction} />
      <div
        className={cls(
          'absolute flex h-full w-full flex-col items-center justify-center italic',
          'pc:items-start pc:p-[0_12%_0_6%]',
        )}
      >
        <h2 className="wes-2 shadow-text-banner text-2xl text-white">{title}</h2>
        <small className="absolute bottom-[20%] text-sm text-white opacity-50">{desc}</small>
      </div>
    </Card>
  );
}

export default Banner;
