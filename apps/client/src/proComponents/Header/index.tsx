'use client';
import cls from 'classnames';
import { useState, useMemo } from 'react';

import { HEADER_ID } from '@/constants';
import { useStore } from '@/context';
import useScrollValue from '@/hooks/useScrollValue';
import { ChildrenParams } from '@/proComponents/NavigationSidebar';
import Logo from './Logo';
import MIcon from './MIcon';
import Navigation from './Navigation';
import SearchBox from './SearchBox';
import SearchBtn from './SearchBtn';

function Header({ onShow, className }: ChildrenParams) {
  const [isSearch, setIsSearch] = useState(false);
  const scrollY = useScrollValue();
  const hasScroll = useMemo(() => scrollY > 0, [scrollY]);
  const { pc } = useStore();
  return (
    <header
      id={HEADER_ID}
      className={cls(
        'fixed top-0 z-l4 h-[theme(spacing.headerH)] w-full justify-center bg-white transition-all duration-500',
        'pc:shadow-header-line pc:sticky pc:overflow-x-clip pc:bg-[transparent] pc:px-10 pc:backdrop-blur',
        {
          'pc:shadow-header pc:!bg-[theme(colors.white/0.9)]': hasScroll,
          'shadow-header': !pc,
        },
        className,
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-xxxl items-center justify-between">
        {pc ? (
          <>
            <Logo className="invisible pc:visible" />
            <SearchBox
              isSearch={isSearch}
              onSearch={setIsSearch}
              containerClassName="pc:visible invisible"
              searchClassName="pl-24"
              className="justify-end"
            >
              <Navigation />
              <SearchBtn onClick={() => setIsSearch(true)} />
            </SearchBox>
          </>
        ) : (
          <SearchBox isSearch={isSearch} onSearch={setIsSearch} searchClassName="pl-8 pr-4" className="justify-between">
            <MIcon name="menu" onClick={onShow} />
            <Logo />
            <MIcon name="search" onClick={() => setIsSearch(true)} />
          </SearchBox>
        )}
      </div>
    </header>
  );
}

export default Header;
