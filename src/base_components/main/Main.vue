<template>
  <v-app>
    <top v-if="$route.path !== '/login' && $route.path !== '/registro' && $route.path !== '/services'" v-on:toggleDrawer="toggleDrawer"></top>
    <lateral v-if="$route.path !== '/login' && $route.path !== '/registro' && $route.path !== '/services'" :drawer="drawer" v-on:emitInnputDrawer="getInnputDrawer"></lateral>

    <v-main color="purple darken-3">
      <v-container fluid grid-list-xs :class="{ 'pa-0' : hidePadding }">
        <router-view :key="$route.path"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Top from '../navs/Top.vue'
  import Lateral from '../navs/Lateral.vue'
  export default {
    components: {
      Top,
      Lateral
    },
    watch: {
      drawer: {
        immediate: true,
        handler: function(n) {
          console.log(n);
        }
      },
    },
    data() {
      return {
        drawer: true
      }
    },
    methods: {
      isActive() {
        return false //this.$route.path != '/login'
      },
      toggleDrawer() {
        this.drawer = !this.drawer
      },
      getInnputDrawer(e) {
        this.drawer = e
      },
    },

    computed: {
      hidePadding() {
        return this.$route.path == '/login' || this.$route.path == '/registro' || this.$route.path == '/services'
      },
    }
  }
</script>

<style media="screen">
  .my-container {
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 7px;
  }

  .v-content__wrap {
    background-color: #f3f6fd !important;
  }

  a {
    text-decoration: none;
  }


  .theme--light.v-application {
    background: #f3f6fd !important;
  }

  .theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #f3f6fd !important;
  }

  .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
    display: none;
  }


  /*.v-toolbar__title {
        font-weight: 300;
        color: #555;
        font-size: 18px;
        margin-bottom: 6px;
    }*/
</style>