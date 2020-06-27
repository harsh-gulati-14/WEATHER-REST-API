// in this function will be called from the user routes in which we will authenticate that it is athe aam euser and check for it
// also the way we will do it is
//1. set up a new header in POSTMAN authorisation and in the value section setting (up til now may be change)
// and add the 'Bearer 'and the token that we get
// 2. after that we need to decode the token that it is the same token that my server has genareatrd so we will do it using jsonweb token
// by passing the secret value that we have been use dwhile setting up th user module 
// after that4. if token got verified we will just check that id of the token that ws auto generatec at the time of of genraetion of token 
// and we will seatch in tokens array of tokken that thae token provided by the authporzation header exists otr not to that user (bnasically means that user is till login or logout)
//.. if ther asll went good we will send that req(user detai) to the get request in router user.js
const jwt=require('jsonwebtoken')
const Users=require('../models/user')
const auth= async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'harshgulati')
        const user=await Users.findOne({_id:decoded._id,'tokens.token':token})
        if(!user)
        {
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error:'Please get authorised'})
    }
}
module.exports=auth