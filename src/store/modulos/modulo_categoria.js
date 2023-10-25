const modulo_categoria = {
  strict: false,

  state: {
    nombre_categoria: null
  },

  getters: {
    get_nombre_categoria: state => state.nombre_categoria,
  },

  mutations: {
    set_nombre_categoria: (state, nombre) => state.nombre_categoria = nombre,
  },

  actions: {
    setNombreCategoria: (context, nombre) => context.commit('set_nombre_categoria', nombre),
  }
}

export default modulo_categoria;