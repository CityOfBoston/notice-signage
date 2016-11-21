import Vue from 'vue'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
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

Raven.config('https://90550913fc2e460a931738a0eb60ca64@sentry.io/116239').addPlugin(RavenVue, Vue).install()
