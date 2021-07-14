<template>
  <div class="">

    <v-chip class="white--text mb-3" small :color="status ? 'green' : 'red'">{{status ? 'online' : 'offline'}}</v-chip>

    <v-row dense align="center">
      <v-col cols="12" md="4">
        <v-text-field v-model="server_url" label="Server URL">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn @click="conect_to_socket" class="white--text mr-3" color="primary" rounded>conectar</v-btn>
        <v-btn @click="disconect_to_socket" class="white--text" color="red" rounded>Desconectar</v-btn>
      </v-col>
    </v-row>

    <v-row dense align="center">
      <v-col cols="12" md="4">
        <v-select :items="items" v-model="selected_item" label="Message Type" item-text="type" return-object></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="send_message" class="white--text" color="success" rounded>Enviar</v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-jsoneditor v-model="selected_item" :options="options" :plus="false" :height="'400px'" @error="onError"></v-jsoneditor>
      </v-col>
    </v-row>

    <v-row dense>
      <pre>{{ server_response }}</pre>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'Agent',
    data() {
      return {
        status: false,
        web_socket: {},
        server_response: [],
        server_url: 'ws://ws.eu.rocketcyber.com/signed/listen/eyJfcmFpbHMiOnsibWVzc2FnZSI6ImV5SnNhV05sYm5ObFgydGxlU0k2SWpJeU16UTJPVGsxWmkwek1TSjkiLCJleHAiOiIyMDIxLTA3LTIyVDEwOjA2OjUzLjgyNFoiLCJwdXIiOm51bGx9fQ==--77e05da89f523401d874ad5b7923230a0f067ed91df22bdee6e1adee73e155ff/EBB3A27D170B2A74A8D13942A5496',
        options: {
          mode: 'code'
        },
        selected_item: {
          type: null
        },
        items: [{
            type: "connected"
          },
          {
            type: "disconnected"
          },
          {
            type: "hash_progress",
            payload: {
              "progress": 0.43
            }
          },
          {
            type: "defender_status",
            payload: {
              "product_status": "foo",
              "last_quick_scan": {
                "scan_source": "bar",
              },
            }
          },
          {
            type: "threat_evaluation",
            payload: {
              "hash": "FILE_HASH",
              "meta": {}
            }
          },
          {
            type: "ip_info",
            payload: {
              "ip": "192.168.0.1",
              "meta": {}
            }
          },
          {
            type: "upload_agent_log",
            payload: {}
          },
          {
            type: "ack",
            payload: "06234af8c9364c0c4f28ac30bad5af0e"
          },
          {
            type: "log",
            payload: {}
          },
        ]
      }
    },

    created() {

    },

    methods: {
      onError() {
        console.log('error')
      },

      disconect_to_socket() {
        this.web_socket.close()
        this.web_socket = {}
      },

      send_message() {
        let msg = JSON.stringify(this.selected_item)
        this.send_to_socket(this.web_socket, msg)
      },

      send_to_socket(socket, payload) {
        socket.send(payload)
      },

      conect_to_socket() {
        this.web_socket = new WebSocket(this.server_url)

        this.web_socket.onmessage = msg => {
          console.log(msg);
          this.server_response.unshift(msg.data)
        }

        this.web_socket.onopen = () => {
          this.status = true
        }

        this.web_socket.onclose = () => {
          this.status = false
        }

        this.web_socket.onerror = err => {
          console.log(err)
        }

        setInterval(() => {
          let msg = JSON.stringify({
            type: 'ping'
          })
          this.send_to_socket(this.web_socket, msg)

        }, 20000)
      }
    }
  }
</script>