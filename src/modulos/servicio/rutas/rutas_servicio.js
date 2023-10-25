import ListaServicios from '../componentes/ListaServicios'

const routes = [
  ...route('/servicios', ListaServicios, {
    Auth: true,
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