type Type =
  | 'phone'
  | 'tel'
  | 'card'
  | 'pwd'
  | 'postal'
  | 'QQ'
  | 'email'
  | 'money'
  | 'URL'
  | 'date'
  | 'number'
  | 'english'
  | 'chinese'
  | 'lower'
  | 'upper'
  | 'HTML'
  | 'IPV6'
  | 'IPV4';
/**
 * 检查字符串
 * @param {*} str
 * @param {*} type
 */
export default function checkStr(str: string | undefined | null, type: Type) {
  if (typeof str !== 'string') {
    return false;
  }
  switch (type) {
    case 'phone': // 手机号码
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel': // 座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card': // 身份证
      return /^\d{15}|\d{18}$/.test(str);
    case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case 'postal': // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ': // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email': // 邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money': // 金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL': // 网址
      // eslint-disable-next-line no-useless-escape
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
    case 'IPV6': // IPV6
      return /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/.test(
        str,
      );
    case 'IPV4': // IPV4
      return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(str);
    case 'date': // 日期时间
      return (
        // eslint-disable-next-line no-useless-escape
        /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
        // eslint-disable-next-line no-useless-escape
        /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      );
    case 'number': // 数字
      return /^[0-9]$/.test(str);
    case 'english': // 英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese': // 中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower': // 小写
      return /^[a-z]+$/.test(str);
    case 'upper': // 大写
      return /^[A-Z]+$/.test(str);
    case 'HTML': // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return false;
  }
}
