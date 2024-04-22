import { getSiteMeta, getVisitorCount } from '@/api';
import Link from '@/components/Link';
import { FOOTER_ID } from '@/constants';

async function Footer() {
  const [data, count] = await Promise.all([getSiteMeta(), getVisitorCount()]);
  return (
    <footer
      id={FOOTER_ID}
      className="flex h-[144px] flex-col justify-center bg-gray8 text-center text-gray5 shadow-[0_1px_theme(colors.white/0.5)_inset] [border-top:1px_solid_theme(colors.gray7)]"
    >
      <p className="mb-4">大神到访数：{count || 0}</p>
      <div className="text-xs">
        {data?.footerLinks.map((item, index) => {
          if (item.url) {
            return (
              <Link href={item.url} key={index} className="block leading-5 hover:underline" target="_blank">
                {item.text}
              </Link>
            );
          }
          return (
            <p key={index} className="leading-5">
              {item.text}
            </p>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
