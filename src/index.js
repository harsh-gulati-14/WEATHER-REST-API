const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const Users = require('./models/user')
const app = express()

const port = process.env.PORT || 3000
// setting up router because we want to separate the router so for easy understanding
const userrouter=require('../src/router/user')
const taskrouter=require('../src/router/task')

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)
app.listen(port, () => {

    console.log('SERVER IS UP')
})

