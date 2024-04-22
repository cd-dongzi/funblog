import cls from 'classnames';

function IImage({ image, className }: { image: string; className?: string }) {
  return (
    <div
      className={cls(
        'absolute left-0 top-0 h-full w-full scale-[1.1] transition-[background-image] duration-500',
        'bg-image bg-[theme(colors.black/0.3)] bg-center',
        className,
      )}
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
}

export default IImage;
