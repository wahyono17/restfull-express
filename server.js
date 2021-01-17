const http = require('http');
const app = require('./app')//ambil app dari app.js

//port ambil dari proses, tapi default 3000 jika tidak di pakai lain
const port = 3000;

const server = http.createServer(app);//artinya create app sebagai server

server.listen(port);