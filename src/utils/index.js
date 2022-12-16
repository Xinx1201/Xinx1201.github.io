import dayjs from 'dayjs'
import qs from 'query-string'
import config from '@/utils/config'

// 将URL中的参数转换成对象
export function parseQuery () {
  return qs.parse(location.search)
}

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