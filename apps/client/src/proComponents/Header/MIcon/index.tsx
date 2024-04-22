import { Icon } from '@funblog/components';

function MIcon({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <div className="flex h-12 w-12 cursor-pointer items-center justify-center text-2xl" onClick={onClick}>
      <Icon name={name} />
    </div>
  );
}

export default MIcon;
