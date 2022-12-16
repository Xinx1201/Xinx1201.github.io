import merge from 'lodash/merge'
import debounce from 'lodash/debounce'
import { Loading, Message, MessageBox, Notification } from 'element-ui'

const SUCCESS = 'success'
const INFO = 'info'
const WARNING = 'warning'
const ERROR = 'error'


const LOADING_DEFAULTS = {
  text: '拼命加载中',
  fullscreen: true,
  background: 'transparent',
  lock: true, // 遮罩
}

let loadingInstance
const loadingHide = () => {
  loadingInstance.close()
}
const debounced = debounce(loadingHide, 500)
const loading = {
  show (config) {
    config = merge({}, LOADING_DEFAULTS, config)
    loadingInstance = Loading.service(config)
    return loadingInstance
  },
  hide (immediately = true) {
    if (immediately) {
      loadingHide()
    } else {
      debounced()
    }
  },
}

const TOAST_DEFAULTS = {
  message: '',
  showClose: true,
}
const toast = (config) => {
  config = merge({}, TOAST_DEFAULTS, config)
  return Message(config)
}

const TIP_DEFAULTS = {
  title: '',
  message: '',
}
const tip = (config) => {
  config = merge({}, TIP_DEFAULTS, config)
  return Notification(config)
}

const ALERT_DEFAULTS = {
  title: '',
  message: '',
}

const alert = (config) => {
  config = merge({}, ALERT_DEFAULTS, config)
  return MessageBox(config)
}

const CONFIRM_DEFAULTS = {
  distinguishCancelAndClose: false,
}

const confirm = (config) => {
  config = merge({}, CONFIRM_DEFAULTS, config)
  const { title, message, ...others } = config
  return MessageBox.confirm(message, title, others)
}

const PROMPT_DEFAULTS = {
}

const prompt = (config) => {
  config = merge({}, PROMPT_DEFAULTS, config)
  const { title, message, ...others } = config
  return MessageBox.prompt(message, title, others)
}

export default {
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
  prompt,
  alert,
  confirm,
  loading,
  tip,
  toast,
}
