import cls from 'classnames';
import React from 'react';

const Card = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(function Card(
  { children, className },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cls(
        'shadow-banner relative h-[calc(350px+theme(spacing.headerH))] overflow-hidden transition-all',
        'md:h-[300px] md:rounded-xl lg:h-80 xl:h-96',
        className,
      )}
    >
      {children}
    </div>
  );
});

export default Card;
