import dayjs from 'dayjs'
import config from '@/utils/config'

// 时间戳格式化
export function dateToString (timestamp, format = 'date') {
  if (timestamp === null) {
    return ''
  }
  let _format = ''
  switch (format) {
    case 'datetime':
      _format = config.DATE.FULL_DATE_TIME
      break
    case 'time':
      _format = config.DATE.HMS
      break
    case 'date':
      _format = config.DATE.SIMPLE_DATE
      break
    default:
      _format = format
      break
  }
  return dayjs(timestamp).format(_format)
}

// 生成随机数
export function randomInt (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}