import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VJsoneditor from 'v-jsoneditor/src/index'

Vue.use(Vuetify)
Vue.use(VJsoneditor)

const opts = {}

export default new Vuetify(opts)