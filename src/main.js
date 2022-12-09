import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入整体样式
import '@/assets/style/main.scss'

// 路由导航
router.beforeEach(async (to, from, next) => {
  if (to.name === 'Fame') {
    next()
  } else {
  }
})




Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
