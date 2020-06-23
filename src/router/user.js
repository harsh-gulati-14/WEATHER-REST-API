const express=require('express')
const router=new express.Router()
const Users = require('../models/user')
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
    const allowed = ['name', 'email', 'passowrd', 'age']
    const isvalid = updates.every((updates) => allowed.includes(updates))
    if (!isvalid) {
        return res.status(404).send({ error: 'INVALID UPDATES' })
    }
    try {
        const _id = req.params.id
        const user = await Users.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
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