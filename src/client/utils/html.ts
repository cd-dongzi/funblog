import { emojiList } from '@/config/emoji'
import Mint from 'mint-filter'
import mintWords from '@/assets/mintWords'

// 解析表情
export const formatEmoji = (value: string) => {
  return value.replace(/\[(.+?)\]/g, (val, content) => {
    const arr = content.split('emoji=')
    const name = arr[1] ? arr[1].trim() : ''
    const current = emojiList.find((item) => item.name === name)
    const text = `<img src="${current?.url}" class="comment-emoji"/>`
    return name ? text : val
  })
}

// 检查敏感词
const mint = new Mint(mintWords)
const emojiRe = /\[(.+?)\]/g
export const checkMint = (text: string) => {
  // 过滤表情导致的敏感词
  return mint.filterSync(text.replace(emojiRe, ''))
}

// 敏感词过滤
export const filterMint = (text: string) => {
  return text
  // return mint.filterSync(text).text as string
}
