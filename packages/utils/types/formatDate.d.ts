type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'M月D日 · YYYY年' | string;
declare function formatDate(time: string | number, format?: DateFormat): string;
export default formatDate;
