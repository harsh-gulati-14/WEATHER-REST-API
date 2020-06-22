const mongoose=require('mongoose')
const validator=require('validator')
const users=mongoose.model('users',{
    name:{
        type:String,   // making a new model now here we nned to spceify that datatype 
        required:true // some of the different confirmation are also provided in mogooose libraray
    },
    email:{
        type:String,
        required:true,
        validate(value) // this is the validoator p[ackage of npm used here
        {
            if(!validator.isEmail(value)){
                throw new Error('EMAIL IS INVALID')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
               throw new Error('Passwrod cant conatin the string password') 
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0)
            {
                throw new Error('AGE MUST BE POSITIVE NUMBER')
            }
        }
    }
})
module.exports=users