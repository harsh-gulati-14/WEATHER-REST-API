const express=require('express')
const router=new express.Router()
const Users = require('../models/user')
const { update } = require('../models/user')
router.get('/users', async (req, res) => {

    try {
        const user = await Users.find({})
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(user)
    }
})
router.get('/users/:id', async (req, res) => {

    const _id = req.params.id // inbuild function of mongoose to get the id of paramtere  that is convert to id(hexa string)
    try {
        const user = await Users.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/users/login',async(req,res)=>{
    try{
        // this is our own where we are going to make a new method
        const user=await Users.findbycred(req.body.email,req.body.password)
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})
router.post('/users', async (req, res) => {

    const user = new Users(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
// this is basically to updates the informatoion 
// so the important part over here is basicallyy hwhat we want to updates and is it valid or not
// if it is not valid then return
// that is the reson I have placed a array of string ehich contains the parameters that can be updated only
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password', 'age']
    const isvalid = updates.every((updates) => allowed.includes(updates))
    if (!isvalid) {
        return res.status(404).send({ error: 'INVALID UPDATES' })
    }
    // now see here we are going to do some changes
    // becuase while updatng any field we want it to get access from the middleware where it will be check
    try {
        const _id = req.params.id
        // previous one w/o middleware
      //  const user = await Users.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
      // new one with middleware
        const user=await Users.findById(_id)
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        // what we are actaully doing here is that we are finding the users by id and then for each in update we are upating the field that is provided in body of update path
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
//delete
router.delete('/users/:id',async(req,res)=>{
    try{
        const user=await Users.findByIdAndDelete(req.params.id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router