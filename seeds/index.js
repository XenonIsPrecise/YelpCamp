const path = require('path');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];



const seedDB = async()=>{
    await Campground.deleteMany({})
    for(let i =0; i<50;i++){
        const cityRank=Math.floor(Math.random()*1000)+1;
        const camp = new Campground({
            location:`${cities[cityRank].city}, ${cities[cityRank].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})