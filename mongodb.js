// to perform CRUD operation 
const mongodb=require('mongodb')
const mongocli=mongodb.MongoClient
const objectid=mongodb.ObjectID
// const id=new objectid()
// console.log(id)
const conurl='mongodb://127.0.0.1:27017'
const databasename='trial'
mongocli.connect(conurl,{ useNewUrlParser:true},(error,client)=>{
    // if(error)
    // {
    //     return console.log('Unable to connect')
    // }

    // const db=client.db(databasename)
    // db.collection('newuser').insertMany([ // new user ins the collection naem
    //     {
    //         name:'harsh1 gulati',
    //         _id:id,
    //         age:19,
    //         complete:true // all the data in JSON format
    //     },
    //     {
    //         name:'gulati1',   // this is the way of entering in the database 
    //         age:20,
    //         complete:true
    //     }   
    // ],(error,result)=>{
    //          if(error)
    //          {
    //             return  console.log("UNABLE")
    //          }
    //          console.log(result.ops)
    //      })
    //      db.collection('newuser').find({name:'harsh1'},(error,user)=>{
    //         if(error)
    //         {
    //             return console.log("UNABLE TO FIND") // to find or read the database
    //         }
    //         console.log(user) 
    //     })
    //     db.collection('newuser').find({name:'harsh1'}).toArray((error,users)=>{
    //         if(error)
    //         {
    //             return console.log("UNABLE TO FIND") // to find or read the database in this to array will make a array of the users
    //         }
    //         console.log(users) 
    //     })
    //     db.collection('tasks').insertMany([ // new user ins the collection naem
    //         {
    //             name:'COMPLETE HOMEWORK',
    //             age:19,
    //             complete:true // all the data in JSON format
    //         },
    //         {
    //             name:'DO COMPETETIVE CODING',   // this is the way of entering in the database 
    //             age:20,
    //             complete:true
    //         }   
    //     ],(error,result)=>{
    //              if(error)
    //              {
    //                 return  console.log("UNABLE")
    //              }
    //              console.log(result.ops)
    //          })
       
    //      update the databse
    //      const updatepromis=db.collection('newuser').updateOne({
    //          _id:new mongodb.ObjectID("5eeccdaa72aed90ffcd34761")
    //      },{
    //          $set:{
    //              name:'HARSH'
    //          }
    //     })
    //     updatepromis.then((res)=>{ //as the api by mongodb return a promise
    //         console.log(res)
    //     }).catch((error)=>{ // so instead of callback function we call use a promise
    //         console.log(error)
    //     })
    //     const updateall=db.collection('tasks').updateMany({
    //         complete:true
    //     },{
    //         $set:{
    //             complete:false
    //         }
    //     })
    //     updateall.then((res)=>{
    //         console.log(res)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    //     to delete
    //     db.collection('newuser').deleteMany({
    //         age:19
    //     }).then((res)=>{
    //         console.log(res)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    })
