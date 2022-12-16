import { parseQuery } from '@/utils'
import UAParser from 'ua-parser-js'
const ua = UAParser(navigator.userAgent)
const query = parseQuery()
const ext = query.ext
const dvc = query.dvc
const dev = query.dev
const agent = navigator.userAgent
const host = location.host

const isWeChat = /MicroMessenger/i.test(agent) || ext === 'wechat'
const isMiniProgram = /miniProgram/i.test(agent) || ext === 'miniProgram'
const isApp = /Chelaile/i.test(agent) || ext === 'app'
const isBrowser = !isWeChat && !isApp && !isMiniProgram
const isLocal = !host || host.includes('localhost') || ['192', '172', '127', '10'].indexOf(host.split('.').shift()) > -1
const isDev = dev || host.includes('github.io')
const isTest = isDev || isLocal
const isStage = host.includes('stage.github.io')
const isProd = host.indexOf('github.io') === 0
const isMobile = ua.os.name === 'Android' || ua.os.name === 'iOS'

const mobile = {}
mobile.isIOS = /iP(ad|hone|od)/.test(agent) || dvc === 'ios'
mobile.isIOS_11 = mobile.isIOS && /OS 11/.test(agent)
mobile.isIPhoneX = mobile.isIOS && /OS X/.test(agent)

export default {
  isWeChat,
  isMiniProgram,
  isApp,
  isBrowser,
  isLocal,
  isDev,
  isTest,
  isStage,
  isProd,
  mobile,
  isMobile,
  ua,
}
