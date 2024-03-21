const http=require('http');
const app=require('./app');
const { model } = require('mongoose');
const server =http.createServer(app);
server.listen(3000,()=>{
    console.log('server is runningat localhost:3000');
})
