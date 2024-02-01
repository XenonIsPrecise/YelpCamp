const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use((req,res,next)=>{
    req.requestTime = Date.now();   
    next();
})

const verifyPassword = (req,res,next)=>{
    const {password} = req.query;
    if(password === "sujal"){
        next();
    }else{
        res.send("Sorry you need a password to continue.")
    }
}

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.get('/dogs',(req,res)=>{
    console.log(`Date and Time: ${req.requestTime}`)
    res.send("I am a dog. Woff Woof!!")
})

app.get('/secret', verifyPassword,(req,res)=>{
    res.send("Although I talk about being mature but to be honest i am still a baby on the inside.")
})

app.use((req,res)=>{
    res.status(404).send("Not found")
})

app.listen(3300,()=>{
    console.log("Running on port 3300")
})