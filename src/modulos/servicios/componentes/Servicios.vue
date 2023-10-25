<template>

  <v-app>

    <top-services></top-services>

    <v-content>


      <v-container>
        <v-row class="mt-8" dense justify="center">
          <v-col cols="12" md="8">
            <v-card>
              <v-toolbar color="pink" class="white--text">
                <v-toolbar-title>
                  <h3 class="font-weight-light">
                    Buscar Servicios
                  </h3>
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row dense align="center">
                  <v-col cols="12" md="6">
                    <v-select color="pink" v-model="query.id" dense outlined small hide-details :items="categorias" label="Categorias" item-text="name" item-value="id"></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field color="pink" v-model="query.zip" dense outlined small hide-details outlined label="Zip"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn @click="filterCombos" rounded depressed hide-details class="white--text" color="pink">
                      Buscar
                      <v-icon right dark>
                        mdi-search-web
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>



              </v-card-text>

            </v-card>
          </v-col>
        </v-row>


        <v-row v-for="item in items" class="mt-6" dense justify="center">
          <v-col cols="12" md="6">
            <v-card>
              <v-toolbar flat dense small color="pink lighten-1" class="white--text">
                <v-icon medium dark>mdi-alert-decagram</v-icon>

                <v-toolbar-title>

                  <h3 class="ml-4 font-weight-light">
                    {{item.combo.title}}
                  </h3>
                </v-toolbar-title>

              </v-toolbar>
              <v-card-text>


                <v-row align="center" class="mx-0 mt-1">
                  <span class="font-weight-bold pink--text text-h5">
                    {{item.owner_id.name}} {{item.owner_id.last_name}}
                  </span>

                  <v-rating class="ml-4" :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                  <div class="grey--text ms-4">
                    4.5 (413)
                  </div>
                </v-row>

                <v-row dense>
                  <v-col cols="12">
                    <div class="mt-4 text-subtitle-1">
                      Descuento: <span class="font-weight-bold green--text">{{item.combo.desc}}%</span>
                      Precio: <span class="font-weight-bold pink--text">{{item.total}}$</span>
                      • {{item.combo.description}}
                    </div>
                  </v-col>

                  <v-col cols="12">
                    Cantidad de horas: <strong>{{item.combo.qtd_time}}</strong>
                  </v-col>

                  <v-col class="mb-4" cols="12">
                    {{item.combo.note}}
                  </v-col>



                </v-row>
                <v-divider></v-divider>

                <v-row dense>
                  <v-col cols="12">
                    <p class="mt-3 pink--text text-h6">
                      Servicios
                    </p>

                    <template v-for="servicio_combo in item.combo.services">
                      <p>{{getServiceName(servicio_combo.service_id)}}</p>
                    </template>
                  </v-col>
                </v-row>

              </v-card-text>


            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>
  import topServices from './topServices'
  import ofertaCard from './ofertaCard'

  export default {
    components: {
      topServices,
      ofertaCard
    },
    data() {
      return {
        items: [],
        service_map: new Map(),
        categorias: [],
        query: {
          id: null,
          zip: null
        }
      }
    },

    created() {
      this.getCategories()
      this.getServices()
    },

    methods: {
      getCategories() {
        this.axios.get(`categories`).then(res => {
          this.categorias = res.data
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },
      getServices() {
        this.axios.get(`services`).then(res => {
          res.data.services.forEach((item, i) => {
            this.service_map.set(item._id, item.name)
          })
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      },
      getServiceName(id) {
        return this.service_map.get(id)
      },
      filterCombos() {
        this.axios.get(`services/${this.query.id}/${this.query.zip}`).then(res => {
          this.items = res.data.combos
          console.log(res.data);
        }, res => {
          this.$toast.error('Error consultando registro')
        })
      }



    },
    computed: {
      isloading() {
        return this.$store.getters.getloading
      },
      errors() {
        return this.$store.getters.geterrors
      },
    }
  }
</script>