const exp = require('express')
const sitesAPI = exp.Router()

sitesAPI.get('/',(req,res)=>{
    res.send("sitesAPI")
})

sitesAPI.get('/site' , async(req,res)=>{
    
    let data = await req.sitesCollection.find({ url : req.query.url} , {APIKey:0}).toArray()
    if(data.length > 0)
    {
        res.send(data[0])
    }
    else
    {
        res.send({status:false , message:"site was not registered by our servers !"})
    }
})

sitesAPI.get('/all-sites' , async (req,res)=>{
    let data = await req.sitesCollection.find().toArray()
    res.send(data)
})

module.exports = sitesAPI