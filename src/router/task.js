const express=require('express')
const router=new express.Router()
const Task = require('../models/task')
const auth=require('../middleware/auth')
// ------------------------------------------ TASK ROUTES________________________________________________________
router.get('/tasks',auth,async (req, res) => {
    try {
        
        // const task = await Task.find({})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(404).send(user)
    }
})
router.get('/tasks/:id', auth,async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task=await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/tasks', auth,async (req, res) => {
    // const task = new Task(req.body)
    const task= new Task({ // new solution so to create a relationship between task and user
        ...req.body, // just copy all the 
        owner: req.user._id
    })  

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowed = ['description','complete']
    const isvalid = updates.every((updates) => allowed.includes(updates))
    if (!isvalid) {
        return res.status(404).send({ error: 'INVALID UPDATES' })
    }
    try {
        const task =await Task.findOne({_id :req.params.id,owner:req.user._id})
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send({error:'here'})
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})
router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        // const task=await Task.findByIdAndDelete(req.params.id)
        const task =await Task.findOneAndDelete({_id :req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router