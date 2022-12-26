import CONFIG from '@/utils/config' // 配置文件
import API from '@/utils/api' // 后台接口
import env from '@/utils/env'

export const jx3 = new API({
  successCode: 200,
  baseURL: env.isTest ? CONFIG.API.JX3.ROOT_DEV : CONFIG.API.JX3.ROOT,
  // 不添加公共参数
  // appendData: (config) => {
  //   config.params._t = +new Date()
  // },
})


const list = {
  jx3,
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
