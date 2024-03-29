import axios from 'axios'
import store from '../store/store'
import auth from '../auth/auth'

export default function setup() {
  axios.interceptors.request.use(function(config) {
    store.dispatch('isLoading', true);
    store.dispatch('setErrors', {
      errors: {}
    })
    return config;
  }, function(err) {
    return Promise.reject(err);
  });

  axios.interceptors.response.use(function(config) {
    store.dispatch('isLoading', false);
    return config;
  }, function(err) {
    if (err.response.status == 422) {
      store.dispatch('setErrors', err.response.data)
    }
    if (err.response.status == 403) {
      auth.logout()
    }
    store.dispatch('isLoading', false);
    return Promise.reject(err);
  });
}