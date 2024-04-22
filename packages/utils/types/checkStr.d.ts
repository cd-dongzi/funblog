type Type = 'phone' | 'tel' | 'card' | 'pwd' | 'postal' | 'QQ' | 'email' | 'money' | 'URL' | 'date' | 'number' | 'english' | 'chinese' | 'lower' | 'upper' | 'HTML' | 'IPV6' | 'IPV4';
/**
 * 检查字符串
 * @param {*} str
 * @param {*} type
 */
export default function checkStr(str: string | undefined | null, type: Type): boolean;
export {};
