import Vue from 'vue'

import VuetifyToast from 'vuetify-toast-snackbar-ng'

import setup from './interceptors/interceptors.js'
setup()

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Loader from './base_components/base/Loader.vue'
Vue.component('loader', Loader)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['x-access-token'] = `${localStorage.getItem('id_token')}`
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.baseURL = 'https://api-dev-mobile.inmigrausa.com/api'

Vue.use(VuetifyToast, {
  x: 'right',
  y: 'top',
  color: 'info',
  icon: 'mdi-info',
  timeout: 3000,
  dismissable: true,
  autoHeight: false,
  multiLine: false,
  vertical: false,
  shorts: {
    error: {
      color: '#EF5350'
    },
    sucs: {
      color: '#8BC34A'
    },
    warn: {
      color: '#FFA726'
    }
  },
  property: '$toast'
})