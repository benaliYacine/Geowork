const http = require('http');
const app = require('./app');
const { model } = require('mongoose');
const server = http.createServer(app);
const WebSocket = require('ws');

// Supprimez l'utilisation de sv et utilisez simplement le serveur HTTP


app.use((req,res,next)=>{
    user_id=req.session.user_id;
    user_type=req.session.user_type;
    next();
});

// Créez le serveur WebSocket en utilisant le serveur HTTP





