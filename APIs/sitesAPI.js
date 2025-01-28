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
    let data = await req.sitesCollection.find(  ).toArray()
    if(data.length > 0)
    {
        res.send({status:true , data:data , userData:req.userDataObject})
    }
    else
    {
        res.send({status:false , message:"no sites found !" , userData:req.userDataObject})
    }
})

sitesAPI.delete('/delete-site' , async(req,res) => {
    console.log(req.body);

    await req.sitesCollection.deleteOne( { url:req.body.url } );
    let data = await req.sessionsCollection.deleteMany( { url:req.body.url } );
    res.send(data)
})

sitesAPI.post('/upgrade-to-premium' , async(req,res)=>{
    console.log(req.body);

    let data = await req.sitesCollection.updateMany( {url : req.body.url} , { $set:{ plan:'premium' } } );
    res.send(data)
})

module.exports = sitesAPI