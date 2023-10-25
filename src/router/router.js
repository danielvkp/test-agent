import VueRouter from 'vue-router'
import auth from '../auth/auth.js'

import Inicio from '../base_components/inicio/Inicio.vue'
import Login from '../base_components/login/Login.vue'
import Registro from '../base_components/registro/Registro.vue'

import categorias from '../modulos/categorias/rutas/rutas_categorias.js'

const routes = [
  ...route('/login', Login),
  ...route('/registro', Registro),
  ...route('/', Inicio, {
    Auth: true
  }),
  ...categorias
]

const router = new VueRouter({
  routes
})

function route(path, component = 'default', meta = {}) {
  return [{
    path,
    component,
    meta
  }]
}

router.beforeEach((to, from, next) => {

  if (to.meta.Auth) {
    const authUser = localStorage.getItem('role')
    if (!auth.authenticated()) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else if (to.meta.require_user) {
      (authUser == 'USER_ROLE') ? next(): next('/404')
    } else if (to.meta.require_admin) {
      (authUser == 'ADMIN_ROLE') ? next(): next('/404')
    } else if (to.meta.require_consultant) {
      (authUser == 'CONSULTANT_ROLE') ? next(): next('/404')
    } else if (to.meta.require_handyman) {
      (authUser == 'HANDYMAN_ROLE') ? next(): next('/404')
    } else if (to.meta.require_colaborator) {
      (authUser == 'COLLABORATE_ROLE') ? next(): next('/404')
    } else if (to.meta.require_company) {
      (authUser == 'COMPANY_ROLE') ? next(): next('/404')
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router