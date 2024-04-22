import cls from 'classnames';

import SearchBar from '../SearchBar';
function SearchBox({
  isSearch,
  onSearch,
  children,
  className,
  searchClassName,
  containerClassName,
}: {
  isSearch: boolean;
  onSearch: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
  searchClassName?: string;
  containerClassName?: string;
}) {
  return (
    <div className={cls('h-full flex-1 overflow-x-clip', containerClassName)}>
      <div
        className={cls('relative h-full w-full transition-transform duration-500', {
          '-translate-x-full': isSearch,
        })}
      >
        <div
          className={cls('flex h-full w-full items-center transition-opacity duration-500', className, {
            'opacity-0': isSearch,
          })}
        >
          {children}
        </div>
        <SearchBar className={searchClassName} onClose={() => onSearch(false)} />
      </div>
    </div>
  );
}

export default SearchBox;
