require('../src/db/mongoose')
const task=require('../src/models/task')
task.findByIdAndDelete('5eece3ea7f0bf51578bb7817',{complete:false}).then((taskdone)=>{
    console.log(taskdone)
    return task.countDocuments({complete:false})
}).then((res)=>{
    console.log(res)
})
