import open from 'open'
import { logMsg } from '../utils'

export default async (url: string) => {
  logMsg('Opening browser...')
  await open(url)
  logMsg('The browser opens successfully!')
}
