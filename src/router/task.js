const express=require('express')
const router=new express.Router()
const Task = require('../models/task')
// ------------------------------------------ TASK ROUTES________________________________________________________
router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(user)
    }
})
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/tasks', async (req, res) => {

    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowed = ['description','complete']
    const isvalid = updates.every((updates) => allowed.includes(updates))
    if (!isvalid) {
        return res.status(404).send({ error: 'INVALID UPDATES' })
    }
    try {
        const _id = req.params.id
        const task=await Task.findById(_id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send({error:'here'})
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})
router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
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