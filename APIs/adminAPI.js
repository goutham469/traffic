const exp = require('express')
const adminAPI = exp.Router()

adminAPI.get('/',(req,res)=>{
    res.send("adminAPI")
})

adminAPI.get('/users' , async (req,res)=>{
    let data = await req.usersCollection.find().toArray()
    res.send(data)
})

adminAPI.post('/update-to-premium-account' , async(req,res)=>{
    if(req.body && req.body.email)
    {
        await req.usersCollection.updateOne({ email : req.body.email } , {$set:{ plan:'premium' , purchasedOn:new Date().toUTCString() ,credits:100}} )
        await req.sitesCollection.updateMany( { email : req.body.email } , {$set:{ plan:'premium' , purchasedOn:new Date().toUTCString() }})
        res.send({status:true , message:"email upgraded to PREMIUM !"})
    }
    else
    {
        res.send({status:false , message:"user email not found !"})
    }
})

adminAPI.post('/update-to-basic-account' , async (req,res)=>{
    if(req.body && req.body.email)
    {
        await req.usersCollection.updateOne({ email : req.body.email } , {$set:{ plan:'basic' , credits:5}})
        await req.sitesCollection.updateMany( { email : req.body.email } , {$set:{ plan:'basic' , changedOn:new Date().toUTCString() }})
        res.send({status:true , message:"email down-graded to BASIC !"})
    }
    else
    {
        res.send({status:false , message:"user email not found !"})
    }
})



module.exports = adminAPI