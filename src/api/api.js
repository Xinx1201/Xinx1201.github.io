import CONFIG from '@/utils/config' // 配置文件
import API from '@/utils/api' // 后台接口
import env from '@/utils/env'

export const user = new API({
  successCode: 0,
  baseURL: env.isTest ? CONFIG.API.DEFAULT.ROOT_DEV : CONFIG.API.DEFAULT.ROOT,
  // 不添加公共参数
  // appendData: (config) => {
  //   config.params._t = +new Date()
  // },
})


const list = {
  user,
}

export default {
  setHeader (header) {
    for (const key of Object.keys(list)) {
      list[key].setHeader(header)
    }
  },
  setLogoutHandler (handler) {
    for (const key of Object.keys(list)) {
      list[key].setLogoutHandler(handler)
    }
  },
  ...list,
}
