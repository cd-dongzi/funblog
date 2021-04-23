import dayjs from 'dayjs'

export const formatTime = (time: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}
