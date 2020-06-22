const mongoose=require('mongoose')
const validator=require('validator')
const tasks=mongoose.model('tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    complete:{
        type:Boolean,
        default:false
    }
})
module.exports=tasks