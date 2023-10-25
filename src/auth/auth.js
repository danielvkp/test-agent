import router from '../router/router.js'
import store from '../store/store.js'
import axios from 'axios'

export default {
  user: {
    authenticated: false,
  },

  signin: function(user) {
    axios.post('auth/login', user).then(response => {
      this.setLocalStorage(response.data)
      this.dispatchUser(response.data.account)
      this.user.authenticated = true
      axios.defaults.headers.common['x-access-token'] = response.data.token
      router.push('/')
    }).catch(error => {
      console.log(error);
      error.response.status == 401 ? store.dispatch('setLoginErrors', error.response.data) : store.dispatch('setLoginErrors', {
        message: null
      })
    })
  },

  dispatchUser: function(data) {
    store.dispatch('setAuth', true)
    store.dispatch('setUser', data)
  },

  setLocalStorage: function(data) {
    localStorage.setItem('id_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.account))
  },

  logout: function() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
    store.dispatch('setAuth', false)
    store.dispatch('setUser', this.setDefault())
    delete axios.defaults.headers.common['x-access-token']
    router.push('/login')
  },

  setDefault: function() {
    return {
      name: '...',
    }
  },

  auth_user: function(response) {
    this.setLocalStorage(response.data)
    this.dispatchUser(response.data.Account)
    this.user.authenticated = true
    axios.defaults.headers.common['x-access-token'] = response.data.token
    router.push('/')
  },

  authenticated: function() {
    return this.check()
  },

  check: function() {
    return (localStorage.getItem('id_token') !== null) ? true : false
  }
}