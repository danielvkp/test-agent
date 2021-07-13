<template>
  <div class="">

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
        web_socket: {},
        server_response: [],
        server_url: 'ws://localhost:3000/signed/listen/eyJfcmFpbHMiOnsibWVzc2FnZSI6ImV5SnNhV05sYm5ObFgydGxlU0k2SW1ZeU5UZGxZMlJoWkMwMUluMD0iLCJleHAiOiIyMDIxLTA2LTA0VDIxOjE1OjIyLjA2NFoiLCJwdXIiOm51bGx9fQ==--9a7be54ed206e964f05d73232821fd90b4856388abf3a817325471f54b76081d/B478047F21D56C9DDFA422BE1F7149AF',
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
          }
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
        console.log('diss');
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