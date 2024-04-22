import React from 'react';
import ALink from '@/components/ALink';
import PanelArrow from '@/components/PanelArrow';

const list = [
  { name: 'nest', rate: 50, url: 'https://nestjs.com/' },
  { name: 'tailwindcss', rate: 70, url: 'https://www.npmjs.com/package/typescript' },
  { name: 'next', rate: 90, url: 'https://nextjs.org/' },
  { name: 'typescript', rate: 98, url: 'https://www.npmjs.com/package/typescript' },
  { name: 'eslint + prettier', rate: 100 },
  { name: 'turborepo + rollup', rate: 100, url: 'https://turbo.build/' },
];
const MeTechnologyStack = () => {
  return (
    <PanelArrow title="本站核心技术">
      本站技术栈：next14 + nest10 + typescript5 + mysql + turborepo + rollup + tailwindcss
      <ALink
        href="https://github.com/cd-dongzi/BlogSource"
        target="_blank"
        className="text-gray4 hover:text-primary hover:underline"
      >
        （Github项目地址）
      </ALink>
      {list.map((item) => (
        <div className="my-4 w-full rounded-2xl bg-gray8 leading-8" key={item.name}>
          <div
            className="flex h-full w-1/2 items-center justify-between rounded-2xl bg-primary px-4 text-white [text-shadow:0_-1px_rgb(0_0_0_/_10%)]"
            style={{ width: `${item.rate}%` }}
          >
            <div>{item.name}</div>
            <div>{item.rate}%</div>
          </div>
        </div>
      ))}
    </PanelArrow>
  );
};

export default MeTechnologyStack;
