const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        trim:true
    },
    metaTags:{
        type:Object,
        required:true
    },
    metaDes:{
        type:String,
        required:true
    },

    body:{
        type:Object,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    nameLink:{
        type:String,
        required:true
    },
    cardimage:{
        type:String,
        required:true
    },
    coverimage:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Blog",blogSchema);