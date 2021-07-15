# agent-test

## Project setup
```
npm install
```

### Run Live Server
```
npm run serve
```

### Visit

http://localhost:8080/

### How to use it

Configurar una url valida, firmada con el mismo valor que la variable de entorno 'SOCKET_PROXY_SECRET'

ejemplo:

ws://localhost:3000/signed/listen/eyJfcmFpbHMiOnsibWVzc2FnZSI6ImV5SnNhV05sYm5ObFgydGxlU0k2SWpJeU16UTJPVGsxWmkwek1TSjkiLCJleHAiOiIyMDIxLTA3LTIyVDEwOjA2OjUzLjgyNFoiLCJwdXIiOm51bGx9fQ==--77e05da89f523401d874ad5b7923230a0f067ed91df22bdee6e1adee73e155ff/EBB3A27D170B2A74A8D13942A5496

ws://<socket_host>:<socket_port>/signed/listen/<signed-token>/<device_id>

### Enviar eventos al socket

Al conectar al servidor este debera responder con dos mensajes que se veran reflejados en pantalla
["ready", "connected"] de haber algun error se veran reflejados en pantalla

Seleccionar que tipo de mensaje se quiere enviar, al recibirlo el socket mostrara en consola todos los mensajes que estan siendo agregados a la cola de redis, en la instancia 'process.env.REDIS_URL'
