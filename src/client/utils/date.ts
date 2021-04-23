import dayjs from 'dayjs'

export const formatTime = (time: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}

export const formatDate = (time: string, format = 'M月D日 · YYYY年') => {
  return dayjs(time).format(format)
}
