const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campGroundSchema = new Schema({
    title: String,
    price:Number,
    description:String,
    location:String,
    image:String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
    ]
});

module.exports= mongoose.model('Campground',campGroundSchema);
