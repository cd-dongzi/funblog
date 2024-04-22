import cls from 'classnames';

import Img from '../Image';
function Cover({ image, className }: { image: string; className?: string }) {
  return (
    <div className="absolute left-0 top-0 -z-10 h-full w-full brightness-[60%]">
      <Img image={image} className={cls('blur', className)} />
    </div>
  );
}

export default Cover;
