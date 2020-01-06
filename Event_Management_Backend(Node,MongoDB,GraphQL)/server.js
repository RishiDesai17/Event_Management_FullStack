const http = require('http');
const app = require('./app');
const port = 3300;
const server = http.createServer(app);
server.listen(process.env.PORT||port, ()=>{
    console.log("running on port "+port);
});