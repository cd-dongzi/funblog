// import { Icon } from '@funblog/components';
import Link from '@/components/Link';
import { useStore } from '@/context';

function FollowMe() {
  const { siteSocialAccount } = useStore();
  return (
    <>
      {siteSocialAccount?.links.map((link) => (
        <Link
          target="_blank"
          href={link.url}
          key={link.name}
          className="group my-2 flex items-center hover:text-primary"
        >
          {/* <Icon
            className="mr-2 cursor-pointer text-lg group-hover:scale-[1.01] group-hover:[transition:.5s_cubic-bezier(.3,60,.5,1),color_.25s]"
            name={link.icon}
          /> */}
          <div>{link.name}</div>
        </Link>
      ))}
    </>
  );
}

export default FollowMe;
