const express=require('express')
const router=new express.Router()
const Users = require('../models/user')
const { update } = require('../models/user')
const auth=require('../middleware/auth')
// ok so we have edited the get user code and added a new route /me 
// this basicaly means we are going to chaek for authorisation if done then we will display th edata of requested user in authorisation function
router.get('/users/me',auth,async (req, res) => {
    res.send(req.user)
})
// router.get('/users/:id', async (req, res) => {

//     const _id = req.params.id // inbuild function of mongoose to get the id of paramtere  that is convert to id(hexa string)
//     try {
//         const user = await Users.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) { // NO NEEDPOF THOIS ROUTER
//         res.status(500).send()
//     }
// })
router.post('/users/login',async(req,res)=>{
    try{
        // this is our own where we are going to make a new method
        const user=await Users.findbycred(req.body.email,req.body.password)
        // ok so here we made a new  method in model user.js where we will be generating a token for login and sign up using jwt
        const token= await user.genauthtoken()
        res.send({user,token}) // now we can use getpublicprofile() also :user.getpublicprofile()
    }catch(e){
        res.status(400).send()
    }
})
router.post('/users/logout',auth,async(req,res)=>{
     try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send('LOGOUT')
     }catch(e){
        res.status(500).send()
     }
})
router.post('/users/logoutall',auth,async(req,res)=>{
    try{
       req.user.tokens=[]
       await req.user.save()
       res.send('LOGOUT')
    }catch(e){
       res.status(500).send()
    }
})
router.post('/users', async (req, res) => {

    const user = new Users(req.body)
    try {
        await user.save()
        // generating a token when signing or creating a new user and login
        const token=await user.genauthtoken()
        res.status(201).send({user,token}) // saving that token :user.getpublicprofile()
    } catch (e) {
        res.status(400).send(e)
    }
})
// this is basically to updates the informatoion 
// so the important part over here is basicallyy hwhat we want to updates and is it valid or not
// if it is not valid then return
// that is the reson I have placed a array of string ehich contains the parameters that can be updated only
router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password', 'age']
    const isvalid = updates.every((updates) => allowed.includes(updates))
    if (!isvalid) {
        return res.status(404).send({ error: 'INVALID UPDATES' })
    }
    // now see here we are going to do some changes
    // becuase while updatng any field we want it to get access from the middleware where it will be check
    try {
        // const _id = req.params.id
        const user=await req.user
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(user) 
    } catch (e) {
        res.status(500).send()
    }
})
//delete
router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user=await Users.findByIdAndDelete(req.user._id)
        // if(!user)
        // { // so here we have made changes as we doesnot need the delete from id anymore so we just remove 
        //     return res.status(404).send()
        // }
        // we authentciated it using auth.js and we are recieving that user data and we just remove it form DB
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router