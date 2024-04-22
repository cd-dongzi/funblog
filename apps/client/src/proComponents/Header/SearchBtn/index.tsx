import { Icon } from '@funblog/components';

function SearchBtn({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray/10 text-text transition-[background-color,color] duration-300 hover:bg-primary hover:text-white"
      onClick={onClick}
    >
      <Icon name="search" />
    </div>
  );
}

export default SearchBtn;
