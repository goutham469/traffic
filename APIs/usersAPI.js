const exp = require('express')
const usersAPI = exp.Router()
const GenerateApiKey = require('../Utils/generateApiKey')
const CheckUserExistence = require('../Middlewares/CheckUserExistence')
const compress = require('../Middlewares/Compress')


usersAPI.get('/',(req,res)=>{
    res.send("usersAPI")
})


usersAPI.get('/all' , async(req,res)=>{
    let data = await req.usersCollection.find().toArray()
    res.send(data)
})

usersAPI.post('/login' , async (req,res)=>{
    let response = await req.usersCollection.find({email:req.body.email}).toArray()
    if(response.length > 0)
    {
       res.send({"message":"login success"})
    }
    else
    {
       response = await req.usersCollection.insertOne({"email":req.body.email,"img":req.body.img , APIKey:GenerateApiKey() , sites:[] , usage:{} , plan:'basic' , credits : 5})
       res.send(response)
    }
})

usersAPI.post('/add-new-site' , CheckUserExistence , async (req,res)=>{

    let response = await req.sitesCollection.find({ url:req.body.url}).toArray()
    if(response.length > 0)
    {
        res.send({status:false , message:"This site was already registered by our Servers !"})
    }
    else
    {
        let data = await req.usersCollection.find({email : req.body.email}).toArray()
        data = data[0];
        if(data.credits > 0 )
        {
            let obj = {
                        url : req.body.url ,
                        email:req.body.email,
                        APIKey: req.body.APIKey,
                        views : 0,
                        stats : {
                                    monthly : [],
                                    weekly : [],
                                    daily : []
                                },
                        ips : [],
                        countrys : [],
                        devices : [],
                        browsers : [],
                        logs : [],
                        referrers : []
                    }
            response = await req.sitesCollection.insertOne(obj)

            await req.usersCollection.updateOne({ email:req.body.email } , {$inc : { credits : -1 }})

            res.send({status:true , message:"Your Site was successfully registered by our Servers !"})
        }
        else
        {
            res.send({status:false , message:"Your credits are over! , upgrade to add more sites ."})
        }
    }
})

usersAPI.post('/delete-site' , CheckUserExistence , async(req,res)=>{
    let response = await req.sitesCollection.find({ url:req.body.url}).toArray()
    
    console.log("request came to delete site : ",req.body)
    console.log("DB sites found : ", response)
    if(response.length == 0)
    {
        console.log("deletion failed ")
        res.send({status:false , message:"This site was not on our servers !"})
    }
    else
    {
        response = await req.sitesCollection.deleteOne( { url:req.body.url } )
        await req.sessionsCollection.deleteMany( { url:req.body.url } )

        await req.usersCollection.updateOne({ email:req.body.email } , {$inc : { credits : 1 }})

        console.log("site deleted response : ",response)

        res.send(response)
    }
})

usersAPI.post('/get-stats' ,CheckUserExistence , compress , async(req,res)=>{
    let data = await req.sitesCollection.find({ email : req.body.email} ).toArray()
    if(data.length > 0)
    {
        res.send({status:true , data:data , userData:req.userDataObject})
    }
    else
    {
        res.send({status:false , message:"no sites found !" , userData:req.userDataObject})
    }
})

usersAPI.post('/get-sessions' ,CheckUserExistence ,  async(req,res)=>{
    let data = await req.sessionsCollection.find({ url : req.body.url} ).toArray()
    if(data.length > 0)
    {
        res.send({status:true , data:data})
    }
    else
    {
        res.send({status:false , message:"site was not registered for sessions !"})
    }
})



module.exports = usersAPI