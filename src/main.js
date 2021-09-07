import Vue from 'vue'
import App from './App.vue'
import router from './Krouter'
import store from './Kstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
