// so thi sis the moongose model we are going to build and set up the databse for the CRUD operation same like momngoddb
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manage-api',{ // openeing the server
    useNewUrlParser:true,
    useCreateIndex:true
})
// const me=new users({
//     name:'GULATI',
//     email:"hashgulati1409@gmail.com",
//     password:"harshgula12@"
// })
// me.save().then((me)=>
// {
//     console.log(me)  // this is the way to sav the update happening in the db and this also return a prmise which can be used in place of callback function
// }).catch((error)=>{
//     console.log("error",error)
// // })
// const task=new tasks({
//     description:'COMPETETIVE CODING1                   '
// })
// task.save().then((task)=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('error',error)
// })