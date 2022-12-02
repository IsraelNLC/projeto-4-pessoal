//servidor.js

const express = require('express');
const servidor = express();
const port = 4010;
const hostname = '127.0.0.1'; 

servidor.use(
    express.urlencoded({
        require: true,
    })
)

servidor.use(express.static("./"));


servidor.get('/', function(res, req, next){
    res.render('index')
})



servidor.listen(port, hostname, () => {
    console.log(`Page server running at http://${hostname}:${port}/`);
});