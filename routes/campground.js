const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


router.get('/home',(req,res)=>{
    res.render('home');
})

router.get('/',catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
}));

router.get('/new',(req,res)=>{
    res.render('campgrounds/new');
});

router.post('/', catchAsync(async(req,res)=>{
   
   const campground =new Campground(req.body.campground);
   await campground.save();
   req.flash('success','Successfully made a new campground!');
   res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async(req,res)=>{ 
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground})
}))

router.get('/:id/edit', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})
)
router.put('/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
}))

module.exports = router;