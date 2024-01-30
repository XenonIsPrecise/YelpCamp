const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});



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

app.get('/makecampground',async(req,res)=>{
    const camp = await new Campground({title:'My Backyard',description:'cheap camping'});
    camp.save();
    res.send(camp);
})