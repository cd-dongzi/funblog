import React from 'react';
import { ICON_PREFIX } from '../constants';
interface SvgContainerProps {
  list: {
    name: string;
    content: string;
  }[];
}
function SvgContainer({ list }: SvgContainerProps) {
  if (!list.length) return null;
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
    >
      {list.map((item) => {
        return (
          <symbol
            key={item.name}
            id={`${ICON_PREFIX}-${item.name}`}
            viewBox="0 0 1024 1024"
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
          />
        );
      })}
    </svg>
  );
}

export default SvgContainer;
