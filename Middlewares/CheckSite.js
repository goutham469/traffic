const CheckSite = (req,res,next) =>{

    if(req.body.url)
    {
        console.log("inside check site middleware !")
        console.log(req.app.get('allSites'))
        if(req.app.get('allSites').includes(req.body.url))
        {
            console.log("domain found on DB ")
            next()
        }
        else
        {
            res.send({status : "domain not found !"})
        }
    }
    else
    {
        res.send({status : "domain not found !"})
    }
}

module.exports = CheckSite;