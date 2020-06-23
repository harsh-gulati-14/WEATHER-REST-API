const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const Users = require('./models/user')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req, res) => {

    try {
        const user = await Users.find({})
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(user)
    }
})
app.get('/users/:id', async (req, res) => {

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
app.post('/users', async (req, res) => {

    const user = new Users(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
app.patch('/')
// ------------------------------------------ TASK ROUTES________________________________________________________
app.get('/tasks', async(req, res) => {
    try{
        const task=await Task.find({})
        res.status(200).send(task)
    }catch(e){
        res.status(404).send(user)
    }
})
app.get('/tasks/:id', async(req, res) => {
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
app.post('/tasks', async(req, res) => {

    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
app.listen(port, () => {

    console.log('SERVER IS UP')
})
