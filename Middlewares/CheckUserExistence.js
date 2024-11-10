const CheckUserExistence = async (req,res,next) =>{
    
    if(req.body.email)
    {
        let data = await req.usersCollection.find({email : req.body.email}).toArray()
        if(data.length > 0)
        {
            req.userDataObject = data[0];
            next();
        }
        else
        {
            res.send({status:false , message:"Your are not a valid user"})
        }
    }
    else
    {
        res.send({status:false , message:"requires user email"})
    }
}

module.exports = CheckUserExistence;