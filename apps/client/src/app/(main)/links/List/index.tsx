import { Link } from '@funblog/types';
import ALink from '@/components/ALink';
import LayoutContainer from '@/components/LayoutContainer';
import PanelArrow from '@/components/PanelArrow';

function List({ list, title }: { list: Link[]; title: string }) {
  return (
    <PanelArrow title={title}>
      <LayoutContainer>
        {list.map((item) => (
          <ALink
            key={item.id}
            target="_blank"
            href={item.url}
            className="shadow-card relative mt-4 block rounded-md bg-secondary px-1 pb-1"
          >
            <div
              className="transition-all-3 bg-image absolute -top-4 left-1 h-[50px] w-[50px] rounded-md border-2 border-solid border-secondary bg-white !bg-contain p-1 shadow-[0_5px_8px_theme(colors.secondary)] hover:scale-[1.32] hover:rounded-[50%]"
              style={{
                backgroundImage: `url(${item.logo})`,
              }}
            ></div>
            <div className="wes ml-16 leading-10 text-white">{item.title}</div>
            <div className="flex h-11 items-center rounded px-2.5 [background:linear-gradient(theme(colors.white),theme(colors.gray9))] [text-shadow:0_1px_theme(colors.white)] hover:text-secondary">
              <p className="h-full max-w-full overflow-y-auto leading-5">{item.desc}</p>
            </div>
          </ALink>
        ))}
      </LayoutContainer>
    </PanelArrow>
  );
}

export default List;
