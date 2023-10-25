import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import Main from "./base_components/main/Main.vue"
import router from "./router/router.js"
import store from "./store/store.js"
import auth from './auth/auth.js'
require("./bootstrap")

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  components: {
    "main-component": Main
  },
  mounted() {
    if (auth.check()) {
      this.setUser()
    }
  },
  methods: {
    setUser() {
      store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
      store.dispatch('setAuth', true)
    }
  },
  render: h => h(Main)
}).$mount('#app')