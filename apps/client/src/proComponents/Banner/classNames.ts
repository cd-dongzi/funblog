import cls from 'classnames';

export const bubble = 'absolute left-0 top-0';
export const content = cls(
  'group relative z-2 flex h-full w-full flex-col-reverse items-center justify-center',
  'pc:flex-row',
);

export const info = cls(
  'mt-5 flex w-[calc(100%-var(--sw))] flex-col items-center justify-start text-sm text-white px-3',
  'pc:mt-0 pc:items-start pc:pl-[5%]',
);

export const tags = cls(
  'relative opacity-75',
  'after:absolute after:-bottom-2 after:block after:h-px after:w-8 after:bg-[currentColor] after:opacity-30 after:content-[""]',
  'after:left-1/2 after:-translate-x-1/2 pc:after:left-0 pc:after:-translate-x-0',
);

export const i = 'mx-1.5';
export const title = 'wes-2 my-4 text-center pc:text-left pc:my-5 text-2xl pc:mb-8 pc:mt-6';
export const button =
  'background-shining flex items-center rounded-[20px] border border-solid border-white/20 px-4 leading-9 shadow-black transition-transform duration-300 hover:border-white pc:hover:translate-x-4';
export const buttonIcon = 'mr-1 text-base';
