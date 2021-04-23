import angry from '@/assets/images/emoji/angry.gif'
import cool from '@/assets/images/emoji/cool.gif'
import cute from '@/assets/images/emoji/cute.gif'
import disdain from '@/assets/images/emoji/disdain.gif'
import embarrassed from '@/assets/images/emoji/embarrassed.gif'
import evil from '@/assets/images/emoji/evil.gif'
import frighten from '@/assets/images/emoji/frighten.gif'
import kiss from '@/assets/images/emoji/kiss.gif'
import love from '@/assets/images/emoji/love.gif'
import pig from '@/assets/images/emoji/pig.gif'
import pull from '@/assets/images/emoji/pull.gif'
import sad from '@/assets/images/emoji/sad.gif'
import scared from '@/assets/images/emoji/scared.gif'
import smile from '@/assets/images/emoji/smile.gif'
import smirking from '@/assets/images/emoji/smirking.gif'
import sunk from '@/assets/images/emoji/sunk.gif'
import sweat from '@/assets/images/emoji/sweat.gif'
import wordless from '@/assets/images/emoji/wordless.gif'

export interface EmojiItem {
  name: string
  url: string
  cn: string
}

export const emojiList: EmojiItem[] = [
  { name: 'angry', url: angry, cn: '愤怒' },
  { name: 'cool', url: cool, cn: '酷' },
  { name: 'cute', url: cute, cn: '可爱' },
  { name: 'disdain', url: disdain, cn: '蔑视' },
  { name: 'embarrassed', url: embarrassed, cn: '尴尬' },
  { name: 'evil', url: evil, cn: '邪恶' },
  { name: 'frighten', url: frighten, cn: '吓唬' },
  { name: 'kiss', url: kiss, cn: '吻' },
  { name: 'love', url: love, cn: '喜欢' },
  { name: 'pig', url: pig, cn: '猪' },
  { name: 'pull', url: pull, cn: '抠鼻' },
  { name: 'sad', url: sad, cn: '伤心' },
  { name: 'scared', url: scared, cn: '害怕' },
  { name: 'smile', url: smile, cn: '微笑' },
  { name: 'smirking', url: smirking, cn: '奸笑' },
  { name: 'sunk', url: sunk, cn: '囧' },
  { name: 'sweat', url: sweat, cn: '流汗' },
  { name: 'wordless', url: wordless, cn: '闭嘴' }
]

// export const emojiList: EmojiItem[] = [
//   { name: 'angry', url: 'http://dzblog.cn/assets/images/emoji/angry.gif', cn: '愤怒' },
//   { name: 'cool', url: 'http://dzblog.cn/assets/images/emoji/cool.gif', cn: '酷' },
//   { name: 'cute', url: 'http://dzblog.cn/assets/images/emoji/cute.gif', cn: '可爱' },
//   { name: 'disdain', url: 'http://dzblog.cn/assets/images/emoji/disdain.gif', cn: '蔑视' },
//   { name: 'embarrassed', url: 'http://dzblog.cn/assets/images/emoji/embarrassed.gif', cn: '尴尬' },
//   { name: 'evil', url: 'http://dzblog.cn/assets/images/emoji/evil.gif', cn: '邪恶' },
//   { name: 'frighten', url: 'http://dzblog.cn/assets/images/emoji/frighten.gif', cn: '吓唬' },
//   { name: 'kiss', url: 'http://dzblog.cn/assets/images/emoji/kiss.gif', cn: '吻' },
//   { name: 'love', url: 'http://dzblog.cn/assets/images/emoji/love.gif', cn: '喜欢' },
//   { name: 'pig', url: 'http://dzblog.cn/assets/images/emoji/pig.gif', cn: '猪' },
//   { name: 'pull', url: 'http://dzblog.cn/assets/images/emoji/pull.gif', cn: '抠鼻' },
//   { name: 'sad', url: 'http://dzblog.cn/assets/images/emoji/sad.gif', cn: '伤心' },
//   { name: 'scared', url: 'http://dzblog.cn/assets/images/emoji/scared.gif', cn: '害怕' },
//   { name: 'smile', url: 'http://dzblog.cn/assets/images/emoji/smile.gif', cn: '微笑' },
//   { name: 'smirking', url: 'http://dzblog.cn/assets/images/emoji/smirking.gif', cn: '奸笑' },
//   { name: 'sunk', url: 'http://dzblog.cn/assets/images/emoji/sunk.gif', cn: '囧' },
//   { name: 'sweat', url: 'http://dzblog.cn/assets/images/emoji/sweat.gif', cn: '流汗' },
//   { name: 'wordless', url: 'http://dzblog.cn/assets/images/emoji/wordless.gif', cn: '闭嘴' }
// ]
