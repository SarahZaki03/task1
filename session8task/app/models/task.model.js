const mongoose = require('mongoose')
const validator = require('validator')

const Data = mongoose.model('Data', {
    title:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:20,
        trim:true
    },
    content:{
        type: String,
        required: true,
        minlength: 10,
        maxlength:200,
        trim:true
    },
    dueDate:{
        type: String,
        validate(value){
            if(!validator.isAfter(value)){
                throw new Error('Date must to be from today')
            }
        }
    }
})

module.exports = Data