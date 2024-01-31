const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.get('/dogs',(req,res)=>{
    res.send("I am a dog. Woff Woof!!")
})

app.listen(3300,()=>{
    console.log("Running on port 3300")
})