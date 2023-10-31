const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        unique: true,
        lowercase:true,
        trim:true
    },
    author: {
        type: String,
        required: false,
        lowercase:true,
        trim:true
    },
    summary:{
        type:String
    },
    isDeleted: {
        type:Boolean,
        default:false
    }
    
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);