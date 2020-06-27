const mongoose=require('mongoose')
const validator=require('validator')
const taskschem=new mongoose.Schema({
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
    }},
    {
        timestamps:true
    }
)
const tasks=mongoose.model('tasks',taskschem)
module.exports=tasks