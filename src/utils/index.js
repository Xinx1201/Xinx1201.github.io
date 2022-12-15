// 获取当前时间
// YYYY-MM-DD
export function formatDate () {
  let date = new Date()
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let day = date.getDate() // 日
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  return `${year}-${month}-${day}`
}

// 获取当前时分秒
// HH:mm:ss
export function formatTime () {
  let date = new Date()
  let hour = date.getHours() // 时
  let minutes = date.getMinutes() // 分
  let seconds = date.getSeconds() //秒
  // 给一位数的数据前面加 “0”
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return `${hour}:${minutes}:${seconds}`
}

// 时间戳格式化(毫秒)
// 1671072166187 => 2022-12-15 10:42:46
export function formatTimestamp (time) {
  let date = new Date(time)
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let day = date.getDate() // 日
  let hour = date.getHours() // 时
  let minutes = date.getMinutes() // 分
  let seconds = date.getSeconds() //秒
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

// 生成随机数
export function randomInt (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}