<template>

  <v-app>
    <v-content>
      <v-container class="fill-height inspire" fluid>

        <v-row align="center" justify="center">


          <v-col cols="12" md="4">
            <img width="100%" src="logo_white.png" alt="">

            <v-card class="mt-8 elevation-4" outlined>
              <v-card-text>
                <h4 style="text-align:center;" class="mb-2 mt-2 red--text text--lighten-1 font-weight-light" v-if="login_errors.mensaje">
                  {{login_errors.mensaje[0]}}
                </h4>
                <v-form>
                  <v-text-field prepend-icon="mdi-account" v-model="user.email" label="Email" required></v-text-field>
                  <v-text-field prepend-icon="mdi-key" v-model="user.password" label="Contraseña" required type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed :disabled="isloading" @click="Login" color="pink darken-1" class="white--text" :loading="isloading">
                  entrar
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
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      Login() {
        auth.signin(this.user)
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