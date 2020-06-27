const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const Task = require('../models/task')
// spo as mongoose just do is that set up the schema before saving
// so here we just make our own schema
// to access the middleware that will be used to save pre or post
const userschema=new mongoose.Schema({
    name:{
        type:String,   // making a new model now here we nned to spceify that datatype 
        required:true // some of the different confirmation are also provided in mogooose libraray
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true, 
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
    },
    tokens:[{
        token:{
            type:String,
            required:true // this is the new object we ahve made which will concat all the new token genarted in this array
        }
    }]
},
    {
        timestamps:true 
})
userschema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})
userschema.methods.genauthtoken=async function(){
    // generating a new token while logina nd signin 
    const user=this
    // strcuture of this line is simply that we will create a token with a random id and 
    // just give a secret value eg in this case "harshgulati"" and genarte a new token value
    // sand just return the token
    const token =jwt.sign({_id:user._id.toString()},"harshgulati")
    user.tokens=user.tokens.concat({token}) // method to make a new token from above in schema(upper)
    await user.save() // save the token to that user from router user.js where we got that request to make a new tokne
    return token // to display on POSTMAN not neccessary
}
userschema.statics.findbycred=async(email,password)=>{
    const user=await users.findOne({email}) 
    if(!user)
    {
        throw new Error('UNABLE TO LOGIN')
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch)
    {
        throw new Error('UNABLE TO LOGIN ') 
    }
    return user
}
userschema.methods.toJSON= function(){
    const user=this
    const userobj=user.toObject()
    delete userobj.password
    delete userobj.tokens
    return userobj
}
// this is to do some changes before saving the nput in the db
// next here refers that we are done with our code 
// we can't use arrow function here because  of it doesn't provide that features
userschema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})
userschema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})
const users=mongoose.model('users',userschema)
module.exports=users