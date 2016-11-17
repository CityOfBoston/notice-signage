import Vue from 'vue'
import App from './App'

Vue.use(require('vue-resource'))

// Need an event bus
window.kyle = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
