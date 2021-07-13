<template>
  <div id="app">
    <v-app>

      <v-app-bar app dark color="light-blue accent-4">
        <v-toolbar-title>AGENT TEST</v-toolbar-title>

      </v-app-bar>

      <v-main>
        <v-container fluid>
          <agent></agent>
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
  import Agent from './components/Agent.vue'

  export default {
    name: 'App',
    components: {
      Agent
    }
  }
</script>