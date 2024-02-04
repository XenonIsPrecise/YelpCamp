const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')

app.use(morgan('tiny'));
app.use((req,res,next)=>{
    req.requestTime = Date.now();   
    next();
})

const verifyPassword = (req,res,next)=>{
    const {password} = req.query;
    if(password === "sujal"){
        next();
    }
    throw new AppError("Password Required",401);
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

app.get('/error',(req,res)=>{
    Chicken();   
})

app.use((req,res)=>{
    res.status(404).send("Not found")
})

app.use((err,req,res,next)=>{
    console.log("***************************************")
    console.log("***************ERROR*******************")
    console.log(err)
    next(err);
})

app.use((err,req,res,next)=>{
    const{status=500,message='Something Wenr Wrong'}=err;
    res.status(status).send(message);
})

app.listen(3300,()=>{
    console.log("Running on port 3300")
})