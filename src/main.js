import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/utils/filters.js' // 过滤器

Vue.use(ElementUI)

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
