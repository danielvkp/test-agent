<template>
  <v-container>

    <h3 class="mb-4 blue--text text--lighten-1">
      Servicios
    </h3>

    <loader v-if="isloading"></loader>

    <v-row dense>
      <v-col cols="12">
        <v-btn @click="nuevoServicio" rounded depressed :disabled="isloading" rounded depressed color="#e91c62" class="white--text mr-3 mt-4">
          Nuevo
        </v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="services" disable-pagination hide-default-footer item-key="key" class="elevation-1 mt-6">


          <template v-slot:item.action="{ item }">

            <v-icon @click="setServicio(item)" small class="mr-2" color="blue">
              mdi-pencil
            </v-icon>

            <v-icon @click="deleteServicio(item)" small color="red lighten-1">
              mdi-trash-can
            </v-icon>
          </template>

        </v-data-table>
      </v-col>
    </v-row>


    <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
        <v-card-title>
          <span class="text-h5">Guardar / Editar Servicio</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-row>
              <v-col cols="12" md="6">
                <v-select v-model="servicio.category_id" small dense outlined hide-details :items="categories" label="Categoria" item-text="name" item-value="id"></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field dense small outlined hide-details v-model="servicio.zip_code" outlined label="Código Postal"></v-text-field>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field dense small outlined hide-details v-model="servicio.name" outlined label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field dense small outlined hide-details v-model="servicio.description" outlined label="Descripción"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="3">
                <v-text-field dense small outlined hide-details v-model="servicio.price" outlined label="Precio"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field dense small outlined hide-details v-model="servicio.price_average[0]" outlined label="Min"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field dense small outlined hide-details v-model="servicio.price_average[1]" outlined label="Max"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field dense small outlined hide-details v-model="servicio.qtd" outlined label="Tiempo servicio"></v-text-field>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field dense small outlined hide-details v-model="servicio.note" outlined label="Nota"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field dense small outlined hide-details v-model="servicio.area_size[0]" outlined label="Alto"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field dense small outlined hide-details v-model="servicio.area_size[1]" outlined label="Largo"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field dense small outlined hide-details v-model="servicio.area_size[2]" outlined label="Ancho"></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed rounded class="white--text" color="red lighten-1" @click="dialog = false">
            cerrar
          </v-btn>
          <v-btn v-if="servicio._id == null" depressed rounded class="white--text" color="green" @click="saveServicio">
            guardar
          </v-btn>
          <v-btn v-if="servicio._id != null" depressed rounded class="white--text" color="green" @click="updateServicio">
            actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  export default {

    data() {
      return {
        dialog: false,
        categories: [],
        servicio: {
          category_id: null,
          type: 'service',
          name: null,
          description: null,
          zip_code: null,
          qtd: 1,
          activated: true,
          price_average: [0, 0],
          price: 60,
          note: null,
          area_size: [0, 0, 0]
        },
        services: [],
        headers: [{
            text: 'Nombre',
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


    mounted() {
      this.getServiciosByUser()
      this.getCategorias()
    },

    methods: {
      getCategorias() {
        this.axios.get(`categories`).then(res => {
          this.categories = res.data
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      getServiciosByUser() {
        this.axios.get(`myservices/${this.user.id}`).then(res => {
          this.services = res.data.services
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      setServicio(item) {
        this.servicio = JSON.parse(JSON.stringify(item))
        this.dialog = true
      },

      nuevoServicio() {
        this.dialog = true
        this.resetForm()
      },

      saveServicio() {
        this.servicio.account_id = this.user.id
        this.axios.post(`/service/${this.servicio.category_id}`, this.servicio).then(res => {
          this.$toast.sucs('Servicio registrado con exito')
          this.resetForm()
          this.dialog = false
          this.services.push(res.data)
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      deleteServicio(item) {
        this.axios.delete(`service/${item._id}`).then(res => {
          this.$toast.sucs('Servicio eliminado con exito')
          this.services.splice(this.services.indexOf(item), 1)
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      updateServicio() {
        this.servicio.account_id = this.user.id
        this.axios.put(`service/${this.servicio._id}`, this.servicio).then(res => {
          this.$toast.sucs('Servicio Actualizado con exito')
          this.dialog = false
          this.resetForm()
          this.getServiciosByUser()
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },

      resetForm() {
        this.servicio = {
          category_id: null,
          type: 'service',
          name: null,
          description: null,
          zip_code: null,
          qtd: 1,
          activated: true,
          price_average: [0, 0],
          price: 60,
          note: null,
          area_size: [0, 0, 0]
        }
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