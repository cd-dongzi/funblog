import NextLink, { LinkProps } from 'next/link';
import React from 'react';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement> & LinkProps
>(({ scroll = true, ...props }, ref) => {
  return <NextLink ref={ref} scroll={scroll} {...props} />;
});

export default Link;
