const exp = require("express")
const mclient = require("mongodb").MongoClient
require("dotenv").config()
const CORS = require('cors')
const path = require('path')

const app = exp()


const usersAPI = require("./APIs/usersAPI")
const trafficAPI = require("./APIs/trafficAPI")
const DBAccess = require("./Middlewares/DBAccess")
const APICounter = require("./Middlewares/APICounter")
const sitesAPI = require("./APIs/sitesAPI")
const CheckSite = require("./Middlewares/CheckSite")
const adminAPI = require("./APIs/adminAPI")

app.use(exp.json())
app.use(CORS())

console.log(process.env.MONGO_DB_URL)

app.use(exp.static(path.join(__dirname, 'public')));

mclient.connect(process.env.MONGO_DB_URL).then(client=>{
    const DB = client.db('traffic')

    const usersCollection = DB.collection('users')
    const sitesCollection = DB.collection('sites')
    const metaCollection = DB.collection('meta')
    const sessionsCollection = DB.collection('sessions')

    app.set('usersCollection' , usersCollection)
    app.set('sitesCollection' , sitesCollection)
    app.set('metaCollection' , metaCollection)
    app.set('sessionsCollection' , sessionsCollection)

    console.log("mongoDB connection successful")
})

app.use(DBAccess)
app.use(APICounter)

app.get('/', (req, res) => {
    res.send(`<h1>Hi i am traffic server !</h1>`);
});


app.use('/users' , usersAPI)
app.use('/traffic' , CheckSite , trafficAPI)
app.use('/sites' , sitesAPI)
app.use('/admin' , adminAPI)


async function setDomains()
{
    try
    {
        let data = await app.get('sitesCollection').find().toArray()
        if(data.length > 0)
        {
            let sites = []
            data.forEach(x=>{
                sites.push(x.url)
            })

            app.set('allSites' , sites)
        }
        else
        {
            app.set('allSites' , [])
        }

        // console.log(app.get('allSites'))
    }
    catch(err)
    {
        console.log(err)
    }
}

setInterval(async ()=>{
    await setDomains()
} , 1000*2) 

app.get('/meta',async (req,res)=>{
    let response = await req.metaCollection.find().toArray()
    res.send(response[0])
})

app.get('/*',(req,res)=>{
    res.send("<h1>Route not found!</h1>")
})


app.listen(4000 , ()=>console.log("server running on port 4000 ..."))