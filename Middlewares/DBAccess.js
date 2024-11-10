const DBAccess = (req,res,next) =>{
    
    req.usersCollection = req.app.get('usersCollection')
    req.sitesCollection = req.app.get('sitesCollection')
    req.metaCollection = req.app.get('metaCollection')
    req.sessionsCollection = req.app.get('sessionsCollection')

    next();

}

module.exports = DBAccess;