import ListaCategorias from '../componentes/ListaCategorias'
import ListaSubcategorias from '../componentes/ListaSubcategorias'

const routes = [
  ...route('/categorias', ListaCategorias, {
    Auth: true,
  }),
  ...route('/sub-categorias/:id', ListaSubcategorias, {
    Auth: true,
  }),
]

function route(path, component = Default, meta = {}, props = true) {
  return [{
    path,
    component,
    meta,
    props
  }]
}

export default routes