'use client';
import { useMount } from '@funblog/hooks';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

function PageTransition({
  children,
  className,
  style,
  disabledSubRoutes,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabledSubRoutes: string[];
}) {
  const ref = useRef({
    prevPathname: '',
  });
  const pathname = usePathname();
  const mounted = useMount();

  useEffect(() => {
    ref.current.prevPathname = pathname;
  }, [pathname]);
  const disabled = disabledSubRoutes.some((r) => [ref.current.prevPathname, pathname].every((p) => p.startsWith(r)));
  const initial = mounted && !disabled ? { y: 40, opacity: 0 } : false;
  return (
    <motion.div
      style={style}
      className={className}
      key={pathname}
      initial={initial}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
