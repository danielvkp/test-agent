<template>
  <v-container>

    <v-card>
      <v-toolbar flat color="indigo accent-4" class="white--text">
        <v-btn to="/" icon text>
          <v-icon small class="white--text">mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>
          <h3 class="font-weight-light">Categorias</h3>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4">
            <v-select small dense outlined hide-details v-model="categoria.type" :items="roles" label="Rol"></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field small dense hide-details v-model="categoria.name" outlined label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-file-input ref="fileinput" small dense hide-details outlined @change="onFileChange" accept="image/*" label="Imagen"></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
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

            <router-link :to="`sub-categorias/${item.id}`">
              <v-icon small class="mr-2" color="orange">
                mdi-file-tree
              </v-icon>
            </router-link>

            <v-icon @click="setItem(item)" small class="mr-2" color="blue">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteCategoria(item)" small color="red lighten-1">
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
        roles: ['COMPANY_ROLE', 'CONSULTANT_ROLE', 'HANDYMAN_ROLE'],

        categorias: [],

        upload: new FormData(),

        categoria: {
          id: null,
          name: null,
          image: null,
          type: null,
          certificate: true,
          enableCertificate: false,
          enableDocument: false,
          enableIdCard: false,
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

    watch: {
      'categoria.type'(n, o) {
        this.getCategories(n)
      }
    },

    methods: {
      nuevo() {
        let type = this.categoria.type
        this.$refs.fileinput.reset()
        this.categoria = {
          id: null,
          name: null,
          image: null,
          type: type,
          certificate: true,
          enableCertificate: false,
          enableDocument: false,
          enableIdCard: false,
        }
      },

      getCategories(role) {
        this.axios.get(`list-category/${role}`).then(res => {
          this.categorias = res.data
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      updateOrCreate() {
        this.categoria.id ? this.updateCategoria() : this.saveCategoria()
      },

      updateCategoria() {
        this.axios.put(`category/${this.categoria.id}`, this.categoria).then(res => {
          this.uploadImage(res.data)
          let find = this.categorias.findIndex(x => x.id == res.data.id)
          this.$set(this.categorias, find, res.data)
          this.nuevo()
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      saveCategoria() {
        this.axios.post(`category`, this.categoria).then(res => {
          this.$toast.sucs('Categoria guardada con exito')
          this.uploadImage(res.data)
          this.categorias.push(res.data)
          this.nuevo()
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      deleteCategoria(item) {
        this.axios.delete(`category/${item.id}`).then(res => {
          this.$toast.sucs('Categoria eliminada con exito')
          let find = this.categorias.findIndex(x => x.id == item.id)
          this.categorias.splice(find, 1)
        }, res => {
          this.$toast.error('Error eliminando categoria')
        })
      },

      uploadImage(categoria) {
        if (!this.upload.has('img')) {
          return null
        }
        this.axios.post(`upload/category/${categoria.id}`, this.upload).then(res => {
          this.$toast.sucs('Imagen cargada con exito')
        }, res => {})
      },

      onFileChange(file) {
        this.upload.append('img', file)
      },

      setItem(item) {
        this.categoria = JSON.parse(JSON.stringify(item))
      }
    },
    computed: {
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