import { Icon } from '@funblog/components';
import cls from 'classnames';
import { useRouter } from 'next/navigation';

function SearchBar({ className, onClose }: { className?: string; onClose: () => void }) {
  const router = useRouter();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let val = target.value;
    val = val.trim();
    if (e.key === 'Enter' && val) {
      onClose();
      router.push(`/search?keyword=${val}`);
      target.value = '';
    }
  };
  return (
    <div className={cls('text-gray-4 absolute left-full top-0 flex h-full w-full items-center justify-end', className)}>
      <Icon name="search" className="mr-2.5 text-lg" />
      <input
        type="text"
        placeholder="搜索您想看的..."
        className="h-full w-full bg-[transparent] outline-none"
        onKeyDown={onKeyDown}
      />
      <Icon
        name="close"
        onClick={onClose}
        className="ml-2.5 cursor-pointer text-xl transition-[transform] hover:scale-110"
      />
    </div>
  );
}

export default SearchBar;
