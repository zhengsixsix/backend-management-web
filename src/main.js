import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.less'

Vue.use(ViewUI)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
