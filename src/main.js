import Vue from 'vue'
import App from './App'

Vue.use(require('vue-resource'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
