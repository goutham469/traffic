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

adminAPI.get('/all-sites-names' , async(req,res)=>{
    let data = await req.sitesCollection.find( {} , { stats:0,ips:0,countrys:0,logs:0,referrers:0,devices:0,browsers:0 }).toArray()
    res.send({success:true,data:data})
})

adminAPI.get('/sessions' , async(req,res) => {
    let data = await req.sessionsCollection.find().toArray()
    if(data.length > 0)
    {
        res.send({status:true , data:data})
    }
    else
    {
        res.send({status:false , message:"site was not registered for sessions !"})
    }
})

function calculateSize(obj) {
    return new TextEncoder().encode(JSON.stringify(obj)).length;
}

adminAPI.get('/overview' , async(req,res) => {
    let obj = {
        totalUsers:0,
        totalLogsSize:0
    }
    let data = await req.sessionsCollection.find().toArray()
    data = calculateSize(data);
    obj.totalLogsSize = data;

    data = await req.usersCollection.find().toArray()
    obj.totalUsers = data.length;
    res.json({
        success:true,
        data:obj
    })

})



module.exports = adminAPI