const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
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



const seedDB = async () => {
    try {
        await Campground.deleteMany({});
        for (let i = 0; i < 25; i++) {
            const cityRank = Math.floor(Math.random() * 1000) + 1;
            const price = Math.floor(Math.random() * 30) + 100;
            const catApi = await axios.get('https://api.thecatapi.com/v1/images/search?limit=25&api_key=live_ey7z16dKybf8zwV0kWaQs7p6YPpx8r7o0uLKaf364eY2EP2LWsB4PEGx3SrlHRKx');
            const imageUrl = catApi.data[0].url;            
            const camp = new Campground({
                location: `${cities[cityRank].city}, ${cities[cityRank].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: imageUrl,
                description: 'loremljiadn ljn dfljsc dlja cljid sc ijane dfsljnf sakld vlkajh',
                price
            });
            await camp.save();
        }
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB().then(()=>{
    mongoose.connection.close();
})