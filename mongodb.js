// to perform CRUD operation 
const mongodb=require('mongodb')
const mongocli=mongodb.MongoClient
const conurl='mongodb://127.0.0.1:27017'
const databasename='trial'
mongocli.connect(conurl,{ useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log('Unable to connect')
    }

    const db=client.db(databasename)
    db.collection('newuser').insertMany([
        {
            name:'harsh1',
            age:19,
            complete:true
        },
        {
            name:'gulati1',
            age:20,
            complete:true
        }   
    ],(error,result)=>{
             if(error)
             {
                return  console.log("UNABLE")
             }
             console.log(result.ops)
         })
        })