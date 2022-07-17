//1 invocamps a expreess
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
var path = require('path');
var publicPath = path.resolve(__dirname, 'public'); 
app.use(express.static(publicPath));

app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.use('/', require('./router.js'));

// 5 Establecemos el motor de plantillas ejs

app.listen(3000, (req,res) =>{
    console.log('Server run en el puerto http://localhost:3000');
});
