const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override')
const axios = require('axios')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/reviews');
const session = require('express-session')
const flash = require('connect-flash')

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});




app.set('views', path.join(__dirname, 'views'));

const sessionConfig={
    secret:'thisshouldbeabettersecret!',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24
    }
}
app.use(session(sessionConfig))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.engine('ejs',ejsMate)



app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds',campgrounds)
app.use('/campgrounds/:id/reviews',reviews)

app.get('/', function (req, res) {
  res.send('Hello World')
})






 app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404))
 })

app.use((err,req,res,next)=>{
    const {statusCode =500, message='Something is wrong. I can feel it'}= err
    res.status(statusCode).send(message);
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})