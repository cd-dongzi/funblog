import React from 'react';
import ALink from '@/components/ALink';
import PanelArrow from '@/components/PanelArrow';

const list = [
  {
    name: 'Github',
    link: 'https://github.com/cd-dongzi',
  },
  {
    name: 'SegmentFault',
    link: 'https://segmentfault.com/u/zi_597d64ce14187',
  },
  {
    name: 'Juejin',
    link: 'https://juejin.im/user/5a73e0335188257a7e3ef88f',
  },
];
const MeForum = () => {
  return (
    <PanelArrow title="站点">
      <ul>
        {list.map((item) => (
          <li key={item.name} className="grid grid-cols-[40%_60%] border-b border-solid border-gray8 px-2.5 py-3">
            <ALink href={item.link} target="_blank" className="text-gray4 [word-wrap:break-word] hover:text-primary">
              {item.name}
            </ALink>
            <ALink href={item.link} target="_blank" className="text-gray4 [word-wrap:break-word] hover:text-primary">
              {item.link}
            </ALink>
          </li>
        ))}
      </ul>
    </PanelArrow>
  );
};

export default MeForum;
