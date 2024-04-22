import { Image } from '@/components/Image';
import { useStore } from '@/context';
import { getResourceUrl } from '@/utils';

function User() {
  const { siteBlogger } = useStore();
  return (
    <div className="flex">
      <Image
        src={getResourceUrl(siteBlogger?.avatar)}
        alt="avatar"
        width={70}
        height={70}
        className="h-[70px] w-[70px] rounded-xl shadow-black"
      />
      <div className="w-[calc(100%-70px)] pl-4">
        <h4 className="wes mt-1 text-lg text-title">{siteBlogger?.username}</h4>
        <p className="wes-2 mt-1 text-xs text-subTitle">{siteBlogger?.desc}</p>
      </div>
    </div>
  );
}

export default User;
