import React from 'react';

type Props = {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;
  style?: any;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: any;
};

const ALink = ({ href = 'javascript:;', target = '_self', className, style, onClick, children }: Props) => {
  return (
    <a className={className} href={href} target={target} onClick={onClick} style={style}>
      {children}
    </a>
  );
};

export default ALink;
