<template>
  <v-card>
    <v-toolbar flat dense small color="blue" class="white--text">

      <v-toolbar-title>
        <h4 class="font-weight-light">
          {{item.title}}
        </h4>
      </v-toolbar-title>

    </v-toolbar>
    <v-card-text>
      <pre>{{item}}</pre>

    </v-card-text>
  </v-card>

</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {}
    }
  }
</script>