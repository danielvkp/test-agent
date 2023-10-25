<template>
  <v-container>

    <v-card>
      <v-toolbar flat color="indigo accent-4" class="white--text">
        <v-btn to="/" icon text>
          <v-icon small class="white--text">mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>
          <h3 class="font-weight-light">Sub Categorias - {{categoria.name}}</h3>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field small dense hide-details v-model="sub_categoria.name" outlined label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-file-input ref="fileinput" small dense hide-details outlined @change="onFileChange" accept="image/*" label="Imagen"></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-btn @click="updateOrCreate" rounded class="white--text" depressed color="indigo accent-4">guardar</v-btn>
            <v-btn @click="nuevo" rounded class="white--text ml-4" depressed color="success">nuevo</v-btn>
          </v-col>
        </v-row>

      </v-card-text>

    </v-card>

    <loader v-if="isloading"></loader>

    <v-row dense>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="categorias" disable-pagination hide-default-footer item-key="key" class="elevation-1 mt-6">

          <template v-slot:item.image="{ item }">
            <img class="mt-2 mb-2" height="50" width="50" :src="`https://inmigrausa.s3.amazonaws.com/${item.image}`" alt="">
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon @click="setItem(item)" small class="mr-2" color="blue">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteSubcategoria(item)" small color="red lighten-1">
              mdi-trash-can
            </v-icon>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {

    data() {
      return {
        categoria: {},

        categorias: [],

        upload: new FormData(),

        sub_categoria: {
          id: null,
          categoryId: null,
          name: null,
          description: null
        },

        headers: [{
            text: 'Image',
            value: 'image',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'Acciones',
            value: 'action',
            sortable: false
          },
        ],
      }
    },

    created() {
      this.sub_categoria.categoryId = this.$route.params.id
      this.getSubCategories(this.$route.params.id)
      this.getCategoria(this.$route.params.id)
    },

    methods: {
      nuevo() {
        this.$refs.fileinput.reset()
        this.sub_categoria = {
          id: null,
          categoryId: null,
          name: null,
          description: null
        }
      },

      getCategoria(id) {
        this.axios.get(`category/${id}`).then(res => {
          this.categoria = res.data
        }, res => {
          this.$toast.error('Error consultando categoria')
        })
      },

      getSubCategories(categoria) {
        this.axios.get(`list-subcategory/${categoria}`).then(res => {
          this.categorias = res.data
        }, res => {
          this.$toast.error('Error consultando subcategorias')
        })
      },

      updateOrCreate() {
        this.sub_categoria.id ? this.updateSubcategoria() : this.saveSubcategoria()
      },

      updateSubcategoria() {
        this.axios.put(`subcategory/${this.sub_categoria.id}`, this.sub_categoria).then(res => {
          this.uploadImage(res.data)
          let find = this.categorias.findIndex(x => x.id == res.data.id)
          this.$set(this.categorias, find, res.data)
        }, res => {
          this.$toast.error('Error actualizando subcategoria')
        })
      },

      saveSubcategoria() {
        this.axios.post(`subcategory`, this.sub_categoria).then(res => {
          this.$toast.sucs('Subcategoria guardada con exito')
          this.uploadImage(res.data)
          this.categorias.push(res.data)
        }, res => {
          this.$toast.error('Error guardando subcategoria')
        })
      },

      deleteSubcategoria(item) {
        this.axios.delete(`subcategory/${item.id}`).then(res => {
          this.$toast.sucs('Subcategoria eliminada con exito')
          let find = this.categorias.findIndex(x => x.id == item.id)
          this.categorias.splice(find, 1)
        }, res => {
          this.$toast.error('Error eliminando subcategoria')
        })
      },

      uploadImage(categoria) {
        if (!this.upload.has('img')) {
          return null
        }
        this.axios.post(`upload/subcategory/${categoria.id}`, this.upload).then(res => {
          this.$toast.sucs('Imagen cargada con exito')
        }, res => {})
      },

      onFileChange(file) {
        this.upload.append('img', file)
      },

      setItem(item) {
        item.categoryId = item.categoryId.id
        this.sub_categoria = JSON.parse(JSON.stringify(item))
      }

    },
    computed: {
      nombre_categoria() {
        return this.$store.getters.get_nombre_categoria
      },
      isloading() {
        return this.$store.getters.getloading
      },
      errors() {
        return this.$store.getters.geterrors
      },
      user() {
        return JSON.parse(localStorage.getItem('user'))
      }
    }
  }
</script>