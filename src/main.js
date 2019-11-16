import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {DateFormat} from '@/assets/js/util'
import './registerServiceWorker'
import '@/directive'

Vue.config.productionTip = false
Vue.filter('format',(date,fmt) => {
  return DateFormat(date,fmt);
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
