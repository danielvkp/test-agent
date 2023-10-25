export const menu_items_mixin = {
  data() {
    return {
      items: [{
        path: '/categorias',
        icon: 'mdi-file-document-box-outline',
        text: 'Categorias',
        user: ['ADMIN_ROLE']
      }]
    }
  },

  computed: {
    role() {
      let user = this.$store.getters.getuser
      return user.role
    },

    computedheaders() {
      if (this.role != null) {
        return this.items.filter(x => {
          return x.user.some(user => user == this.role)
        })
      }
      return []
    }
  }
}