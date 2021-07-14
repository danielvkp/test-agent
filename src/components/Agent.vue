<template>
  <div class="">

    <v-chip class="white--text mb-3" small :color="status ? 'green' : 'red'">{{status ? 'online' : 'offline'}}</v-chip>

    <v-row dense align="center">
      <v-col cols="12" md="4">
        <v-text-field v-model="server_url" label="Server URL">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn @click="conect_to_socket" class="white--text mr-3" color="primary" rounded>Connect</v-btn>
        <v-btn @click="disconect_to_socket" class="white--text" color="red" rounded>Disconnect</v-btn>
      </v-col>
    </v-row>

    <v-row dense align="center">
      <v-col cols="12" md="4">
        <v-select :items="items" v-model="selected_item" label="Message Type" item-text="type" return-object></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="send_message" class="white--text" color="success" rounded>Send</v-btn>
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
        ping_interval: null,
        status: false,
        web_socket: {},
        server_response: [],
        //server_url: 'ws://ws.eu.rocketcyber.com/signed/listen/eyJfcmFpbHMiOnsibWVzc2FnZSI6ImV5SnNhV05sYm5ObFgydGxlU0k2SWpJeU16UTJPVGsxWmkwek1TSjkiLCJleHAiOiIyMDIxLTA3LTIyVDEwOjA2OjUzLjgyNFoiLCJwdXIiOm51bGx9fQ==--77e05da89f523401d874ad5b7923230a0f067ed91df22bdee6e1adee73e155ff/EBB3A27D170B2A74A8D13942A5496',
        server_url: 'ws://localhost:5000/signed/listen/eyJfcmFpbHMiOnsibWVzc2FnZSI6ImV5SnNhV05sYm5ObFgydGxlU0k2SWpJeU16UTJPVGsxWmkwek1TSjkiLCJleHAiOiIyMDIxLTA3LTIyVDEwOjA2OjUzLjgyNFoiLCJwdXIiOm51bGx9fQ==--77e05da89f523401d874ad5b7923230a0f067ed91df22bdee6e1adee73e155ff/EBB3A27D170B2A74A8D13942A5496',
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
              "threat_count": 0,
              "version_info": [{
                "last_update": 1581372024,
                "platform_version": "4.18.1911.3"
              }, {
                "service_version": "4.18.1911.3",
                "last_update": 1581372024
              }, {
                "file_system_filter_version": "4.18.1911.3",
                "last_update": 1581372024
              }, {
                "last_update": 1619461046,
                "engine_version": "1.1.18100.5"
              }, {
                "last_update": 1619461046,
                "as_signature_version": "1.337.2.0"
              }, {
                "last_update": 1619461046,
                "av_signature_version": "1.337.2.0"
              }, {
                "nis_engine_version": "1.1.18100.5",
                "last_update": 1619461046
              }, {
                "nis_signature_version": "1.337.2.0",
                "last_update": 1619461046
              }],
              "product_status_strings": ["Pending manual steps due to threat action"],
              "suspicious_threat_count": 0,
              "last_quick_scan": {
                "threat_count": 0,
                "file_bytes_count": 2649031612,
                "suspicious_threat_count": 0,
                "reg_key_count": 28467,
                "scan_guid": "2868e268-6904-4e0a-a0a7-6483d8eb1828",
                "end_time": 1618958060,
                "start_time": 1618957788,
                "ppm_progress": 1000000,
                "scan_type": 1,
                "signature_version": "1.335.1292.0",
                "file_count": 42334,
                "process_count": 132
              },
              "product_status": 16,
              "last_full_scan": {
                "threat_count": 11,
                "file_bytes_count": 44694381172,
                "suspicious_threat_count": 0,
                "reg_key_count": 2446,
                "scan_guid": "c7463efe-7e6a-401e-8df0-a2db74e6232b",
                "end_time": 1597960172,
                "start_time": 1597959395,
                "ppm_progress": 1000000,
                "scan_type": 2,
                "signature_version": "1.321.1826.0",
                "file_count": 327635,
                "process_count": 212
              },
              "component_status": [{
                "enabled": true,
                "component_id": 0,
                "hresult": 0,
                "name": "Antispyware Signature"
              }, {
                "enabled": true,
                "component_id": 1,
                "hresult": 0,
                "name": "Antivirus Signature"
              }, {
                "enabled": false,
                "component_id": 2,
                "hresult": 0,
                "name": "Realtime Monitor"
              }, {
                "enabled": false,
                "component_id": 3,
                "hresult": 0,
                "name": "On Access Protection"
              }, {
                "enabled": false,
                "component_id": 4,
                "hresult": 0,
                "name": "IE Outlook Protection"
              }, {
                "enabled": false,
                "component_id": 5,
                "hresult": 0,
                "name": "Behavioral Monitor"
              }, {
                "enabled": true,
                "component_id": 6,
                "hresult": 0,
                "name": "Auto Scan"
              }, {
                "enabled": true,
                "component_id": 7,
                "hresult": 0,
                "name": "Auto Signature Update"
              }, {
                "enabled": false,
                "component_id": 9,
                "hresult": 0,
                "name": "Network inspection system"
              }]
            }
          },
          {
            type: "threat_evaluation",
            payload: {
              hash2: "1c1760ed4d19cdbecb2398216922628b",
              meta: {
                ticket: "28217720182XZ",
                request_time: 1626301202
              }
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

    watch: {
      'status'(n) {
        if (n) {
          this.ping_interval = setInterval(() => {
            let msg = JSON.stringify({
              type: 'ping'
            })
            this.send_to_socket(this.web_socket, msg)
          }, 30000)
        } else {
          clearInterval(this.ping_interval)
          console.log('clear_interval');
        }
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
          console.log('connection_close');
          this.status = false
        }

        this.web_socket.onerror = err => {
          console.log(err)
        }

      }
    }
  }
</script>