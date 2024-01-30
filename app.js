const express = require("express");
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

app.get('/home',(req,res)=>{
    res.render('home');
})