// in this we will explore the promise chaining method of mongooose and diffrerent things
 require("../src/db/mongoose")
 const user=require('../src/models/user')
const users = require("../src/models/user")
// this is the promise chanining method in which we are chaining the two ansy promises so that it dousnot occur the nested situtaion
users.findByIdAndUpdate('5ef05ff035b1000734bd79fe',{age:1}).then((changeuser)=>{
    console.log(changeuser)
    return users.countDocuments({email:'harshgulati1409@gmail.com'})
}).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e)
})
// so basically here what we are doing is that we are upadating the age of one id 
// and in the same promise we are also getting the count of the users hacving email as hars....

