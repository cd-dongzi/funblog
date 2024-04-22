import ALink from '@/components/ALink';
import { NormalImage } from '@/components/Image';
import PanelArrow from '@/components/PanelArrow';
import Tooltip from '@/components/Tooltip';
import styles from './style.module.css';

const list = [
  { label: '姓名', value: '陈冬' },
  { label: '民族', value: '汉族' },
  { label: '地区', value: '北京' },
  { label: '籍贯', value: '湖南 娄底' },
  { label: '职业', value: '前端代码搬运工' },
  // { label: '职业状态', value: '在职看机会' },
  {
    label: '公众号',
    value: '冬瓜书屋',
    image: 'https://assets-open.dzblog.cn/images/other/a3a358162ab26.jpg',
  },
  { label: 'QQ', value: '1262498319', copy: true },
  {
    label: 'QQ群',
    value: '810018802',
    copy: true,
    href: 'https://jq.qq.com/?_wv=1027&k=yy8ZWGDQ',
    hrefText: '点击加入',
  },
  { label: 'Email', value: 'cd@dzblog.cn', copy: true },
  { label: '爱好', value: '爱看科幻、武侠及稀奇古怪的书、顺便撸猫' },
];
function Me() {
  return (
    <PanelArrow title="关于我">
      <p className={styles.snippet}>
        读万卷书不如行万里路，行万里路不如阅人无数；阅人无数不如名师指路，名师指路不如自己去悟。
      </p>
      <>
        <ul className="mt-3.5 pc:grid pc:grid-cols-[repeat(2,50%)]">
          {list.map((item) => {
            const value = <span className={item.copy ? 'me-personal-val' : ''}>{item.value}</span>;
            return (
              <li
                key={item.label}
                className="border-b border-solid border-gray8 px-2 py-2.5 pc:px-2.5 pc:py-3 pc:[&:nth-child(4n+1)]:bg-[--color-text-bg] pc:[&:nth-child(4n+2)]:bg-[--color-text-bg] mobile:[&:nth-child(odd)]:bg-[--color-text-bg]"
              >
                <span>{item.label}</span>：
                {item.image ? <Tooltip content={<NormalImage src={item.image} />}>{value}</Tooltip> : value}
                {item.href && (
                  <ALink href={item.href} className="text-gray4" target="_blank">
                    {item.hrefText}
                  </ALink>
                )}
              </li>
            );
          })}
        </ul>
      </>
    </PanelArrow>
  );
}

export default Me;
