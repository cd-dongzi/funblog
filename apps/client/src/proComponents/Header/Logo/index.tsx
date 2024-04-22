import { NormalImage } from '@/components/Image';
import Link from '@/components/Link';
import { useStore } from '@/context';
import { getResourceUrl } from '@/utils';

function Logo({ className }: { className?: string }) {
  const { siteMeta } = useStore();
  return (
    <Link href="/" className={className}>
      {siteMeta?.logo && <NormalImage src={getResourceUrl(siteMeta.logo)} className="h-[48px] w-[200px]" />}
    </Link>
  );
}

export default Logo;
