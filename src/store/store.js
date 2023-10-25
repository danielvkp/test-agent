import modulo_estado from './modulos/modulo_estado'
import modulo_token from './modulos/modulo_token'
import modulo_categoria from './modulos/modulo_categoria'

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,

  modules: {
    estado: modulo_estado,
    token: modulo_token,
  },

})

export default store;