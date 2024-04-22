import dayjs from 'dayjs';

type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'M月D日 · YYYY年' | string;

function formatDate(time: string | number, format: DateFormat = 'YYYY-MM-DD') {
  return dayjs(time).format(format);
}
export default formatDate;
