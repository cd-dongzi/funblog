import marked from 'marked'
import highlightJs from '@root/src/shared/utils/highlight'

// 获取浏览器类型
export function getOS(ua: string) {
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isFireFox = /(?:Firefox)/.test(ua)
  const isChrome = /(?:Chrome|CriOS)/.test(ua)
  const isAndroid = /(?:Android)/.test(ua)
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isChrome,
    isFireFox,
    isTablet,
    isPhone,
    isAndroid,
    isPc
  }
}

/**
 * 判断是否是pc
 *
 * @param {string} userAgent
 * @returns
 */

export const isPC = (ua: string) => {
  const os = getOS(ua)
  return os.isPc
}

/**
 * 判断手机类型
 *
 * @param {string} userAgent
 * @returns
 */
export const mobileType = (userAgent: string) => {
  if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
    // 安卓手机
    return 'Android'
  } else if (userAgent.indexOf('iPhone') > -1) {
    // 苹果手机
    return 'iPhone'
  } else if (userAgent.indexOf('iPad') > -1) {
    // iPad
    return 'iPad'
  } else if (userAgent.indexOf('Windows Phone') > -1) {
    // winphone手机
    return 'Windows Phone'
  } else {
    return 'none'
  }
}
/**
 * 判断浏览器
 *
 * @export
 * @param {string} userAgent
 * @returns
 */
export function browserType(userAgent: string) {
  const isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
  const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) return 'IE7'
    else if (fIEVersion === 8) return 'IE8'
    else if (fIEVersion === 9) return 'IE9'
    else if (fIEVersion === 10) return 'IE10'
    else return 'IE7以下' // IE版本过低
  }
  if (isIE11) return 'IE11'
  if (isEdge) return 'Edge'
  if (isFF) return 'FF'
  if (isOpera) return 'Opera'
  if (isSafari) return 'Safari'
  if (isChrome) return 'Chrome'
}

/**
 * 深克隆
 * @param obj
 */
export const deepClone = (obj: AnyObject) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 过滤对象值为指定值的对象
 * @param map
 * @param val
 */
export const filterObjByValue = (map: AnyObject, val = '') => {
  const obj: AnyObject = {}
  for (const key in map) {
    if (map[key] !== val) {
      obj[key] = map[key]
    }
  }
  return obj
}

/**
 * 过滤对象属性
 * @param object
 * @param keys
 */
export const filterObjByKey = <T extends AnyObject>(map: T, keys: string[] = []) => {
  return Object.keys(deepClone(map))
    .filter((key) => keys.every((k) => k !== key))
    .reduce((obj, key) => {
      obj[key] = map[key]
      return obj
    }, {} as AnyObject) as T
}

// 解析markdown
export const formartMd = (md: string) => {
  const renderer = new marked.Renderer()
  renderer.image = (href, title, text) => {
    return `<img class="preview-image" src="${href}" alt="${text}" ${title ? `title="${title}"` : ''}/>`
  }
  renderer.code = (code, lang) => {
    code = `${highlightJs.highlightAuto(code).value}<span class="copy-code-btn">${lang ? `${lang} ` : ''}复制代码</span>`
    return `<pre><code ${lang ? `class="${renderer.options.langPrefix}${lang}"` : ''}>${code}</code></pre>\n`
  }
  renderer.codespan = (text) => {
    return `<code class="code-span">${text}</code>`
  }
  marked.setOptions({
    renderer,
    gfm: true, // 允许 Git Hub标准的markdown.
    breaks: true, // 允许回车换行。该选项要求 gfm 为true。
    pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false // 使用更为时髦的标点，比如在引用语法中加入破折号。
  })
  const html = marked(md)
  return html
}

// 范围内随机数字
export const randNumber = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min))
}
