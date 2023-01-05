import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dialog from '@/utils/dialog'
import Copyable from '@/components/Copyable'

// 引入Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/utils/filters.js' // 过滤器
import '@/assets/style/font.scss' // 引入全局字体

Vue.use(ElementUI)
Vue.component('Copyable', Copyable)
Vue.prototype.$dialog = dialog

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 引入整体样式
import '@/assets/style/main.scss'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
