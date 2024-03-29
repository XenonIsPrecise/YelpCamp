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

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.engine('ejs',ejsMate)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/home',(req,res)=>{
    res.render('home');
})

app.get('/campgrounds',catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
}));

app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new');
});

app.post('/campgrounds', catchAsync(async(req,res)=>{
   const campground =new Campground(req.body.campground);
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async(req,res)=>{ 
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
}))

app.get('/campgrounds/:id/edit', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})
)
app.put('/campgrounds/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
}))

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