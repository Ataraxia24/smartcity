import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import request from './common/request.js'


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif