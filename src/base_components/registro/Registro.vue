<template>

  <v-app>
    <v-content>
      <v-container class="fill-height inspire" fluid>

        <v-row align="center" justify="center">

          <!-- card para pedir codigo -->
          <v-col cols="12" md="4" v-show="!user.activated">
            <v-card class="elevation-4 pt-6 pb-4" outlined>
              <v-card-text>

                <h3 class="mb-4">Valida tus datos</h3>

                <v-form>

                  <v-row v-if="active.validate==false" dense>
                    <v-col v-if="active.type == 'email'" cols="12">
                      <v-text-field v-model="active.email" hide-details prepend-inner-icon="mdi-email-outline" dense outlined label="Email"></v-text-field>
                    </v-col>
                    <v-col v-else cols="12">
                      <v-text-field v-model="active.sms" hide-details prepend-inner-icon="mdi-phone" type="text" dense outlined label="Télefono"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense v-else>
                    <v-col cols="12">
                      <v-text-field v-model="active.code" hide-details prepend-inner-icon="mdi-send" type="text" dense outlined label="Código"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense v-if="active.validate==false">
                    <v-radio-group hide-details v-model="active.type" column>
                      <v-radio label="SMS" value="sms"></v-radio>
                      <v-radio label="Email" value="email"></v-radio>
                    </v-radio-group>
                  </v-row>


                </v-form>
              </v-card-text>

              <v-card-actions>


                <v-btn v-if="active.validate==false" depressed :disabled="isloading" @click="getCode" color="pink darken-1" class="white--text" :loading="isloading">
                  Obtener Código
                </v-btn>

                <v-btn v-else depressed :disabled="isloading || active.code == null" @click="verificarCodigo" color="pink darken-1" class="white--text" :loading="isloading">
                  Verificar Código
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col v-show="user.activated" cols="12" md="6">

            <v-row dense align="center" justify="center">
              <img style="margin:auto;" width="50%" src="logo_white.png" alt="">
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <h1 style="text-align:center;" class="white--text mt-4 mb-4">REGISTRO</h1>
              </v-col>
            </v-row>

            <v-card class="elevation-4 pt-6 pb-4" outlined>
              <v-card-text>

                <v-form>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.name" prepend-icon="mdi-account" dense outlined label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.last_name" prepend-icon="mdi-account-alert" dense outlined label="Apellido"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.email" prepend-icon="mdi-email-outline" dense outlined label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.phone" prepend-icon="mdi-phone" type="number" dense outlined label="Télefono"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.password" outlined dense @click:prepend="show1 = !show1" :prepend-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" small placeholder="Contraseña" required :type="show1 ? 'text' : 'password'">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="user.passwordConfirmation" outlined dense @click:prepend="show2 = !show2" :prepend-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" small placeholder="Confirmacion" required :type="show2 ? 'text' : 'password'">
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12">
                      <v-file-input outlined prepend-icon="mdi-camera" dense ref="file" label="Imagen" v-on:change="onFileChange"></v-file-input>
                    </v-col>
                  </v-row>

                </v-form>
              </v-card-text>

              <v-card-actions>

                <v-spacer></v-spacer>

                <v-btn depressed :disabled="isloading" @click="signup" color="pink darken-1" class="white--text" :loading="isloading">
                  Registrar
                </v-btn>

              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>
  import auth from '../../auth/auth.js'
  export default {
    data() {
      return {
        active: {
          type: 'email',
          email: null,
          sms: null,
          validate: false,
          code: null
        },
        show1: false,
        show2: false,
        user: {
          activated: false,
          name: null,
          last_name: null,
          email: null,
          phone: null,
          password: null,
          passwordConfirmation: null,
          image: null,
          role: 'HELPER_ROLE'
        }
      }
    },
    methods: {
      signup() {
        this.axios.post(`signup`, this.user).then(res => {
          auth.auth_user(res)
        }, res => {
          if (res.response.status == 400) {
            return this.$toast.error('Usuario ya se encuentra registrado')
          }
          this.$toast.error('Error registrando usuario')
        })
      },

      getCode() {
        const value = this.active.type == 'email' ? this.active.email : this.active.sms
        this.axios.post(`get_code/${value}`, this.active).then(res => {
          this.active.validate = true
          this.$toast.sucs('Código enviado con exito')
        }, res => {
          this.$toast.error('Error obteniendo código')
        })
      },

      verificarCodigo() {
        const value = this.active.type == 'email' ? this.active.email : this.active.sms
        this.axios.post(`get_code/${value}`, this.active).then(res => {
          if(res.data.ok == 'false' || res.data.ok == false){
            return this.$toast.error('Error Validando código')
          }
          this.user.activated = true
          this.active.type == 'email' ? this.user.email = value : this.user.phone = value
          this.$toast.sucs('Código validado con exito')
        }, res => {
          this.$toast.error('Error Validando código')
        })
      },
      onFileChange(file) {

      }
    },
    computed: {
      isloading: function() {
        return this.$store.getters.getloading
      },
      login_errors: function() {
        return this.$store.getters.get_login_errors
      },
    }
  }
</script>

<style>
  .inspire {
    background: rgb(5, 79, 200);
    background: linear-gradient(90deg, rgba(5, 79, 200, 1) 0%, rgba(27, 115, 244, 1) 100%);
  }

  .cover-img {
    height: 100%
  }

  .back {
    background-color: #212121;
  }
</style>
