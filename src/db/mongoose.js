// so thi sis the moongose model we are going to build and set up the databse for the CRUD operation same like momngoddb
const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manage-api',{ // openeing the server
    useNewUrlParser:true,
    useCreateIndex:true
})
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
const tasks=mongoose.model('tasks',{
    description:{
        type:String
    },
    complete:{
        type:Boolean 
    }
})
const me=new users({
    name:'GULATI',
    email:"hash"
})
me.save().then((me)=>
{
    console.log(me)  // this is the way to sav the update happening in the db and this also return a prmise which can be used in place of callback function
}).catch((error)=>{
    //console.log("error")
})
// const task=new tasks({
//     description:'COMPETETIVE CODING',
//     complete:false
// })
// task.save().then((task)=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('error')
// })