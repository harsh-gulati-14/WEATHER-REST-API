const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const users = require('./models/user')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.get('/users',(req,res)=>{
    users.find({}).then((users)=>{
        res.send(users)
    }).catch((err)=>{
    })
})
app.post('/users', (req, res) => {

    const user = new User(req.body)

    user.save().then((user) => {

        res.status(201).send(user)

    }).catch((err) => {
        res.status(400).send(err)
    })
})
app.post('/tasks',(req,res)=>{

    const task=new Task(req.body)

    task.save().then((task)=>{

        res.status(201).send(task)

    }).catch((err)=>{

        res.status(400).send(err)
    })
})
app.listen(port, () => {

    console.log('SERVER IS UP')
})
