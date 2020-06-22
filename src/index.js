const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const Users = require('./models/user')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users',(req,res)=>{

    Users.find({}).then((users)=>{

        res.send(users)

    }).catch((err)=>{

        res.status(500)
    })
})
app.get('/users/:id',(req,res)=>{

        const _id=req.params.id // inbuild function of mongoose to get the id of paramtere  that is convert to id(hexa string)

        Users.findById(_id).then((user)=>{
            if(!user)
            {
                return res.status(404).send()   
            }
            res.send(user)
        }).catch(()=>{
            res.status(500).send()    
        })
})
app.post('/users', (req, res) => {

    const user = new Users(req.body)

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
