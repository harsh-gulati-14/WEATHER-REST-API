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
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    }
})
module.exports=tasks