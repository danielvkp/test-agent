import Servicios from '../componentes/Servicios'

const routes = [
  ...route('/services', Servicios, {
    Auth: false,
  }),
]

function route(path, component = Default, meta = {}) {
  return [{
    path,
    component,
    meta
  }]
}

export default routes