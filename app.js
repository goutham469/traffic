
const exp = require("express")
const mclient = require("mongodb").MongoClient
require("dotenv").config()
const CORS = require('cors')
const path = require('path')

const app = exp()

const serverless = require("serverless-http")

const usersAPI = require("./APIs/usersAPI")
const trafficAPI = require("./APIs/trafficAPI")
const DBAccess = require("./Middlewares/DBAccess")
const APICounter = require("./Middlewares/APICounter")
const sitesAPI = require("./APIs/sitesAPI")
const CheckSite = require("./Middlewares/CheckSite")
const adminAPI = require("./APIs/adminAPI")

app.use(exp.json())
app.use(CORS(  ))

console.log(process.env.MONGO_DB_URL)

// Global variable to store MongoDB connection status
let isMongoConnected = false;

// MongoDB setup
let mongoClientPromise = mclient.connect(process.env.MONGO_DB_URL)
.then(client => {
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

    isMongoConnected = true;
})
.catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit process on failure
});

// Middleware to wait for MongoDB connection
app.use(async (req, res, next) => {
    if (!isMongoConnected) {
        try {
            await mongoClientPromise; // Wait for the MongoDB connection
            next(); // Proceed if connected
        } catch (err) {
            return res.status(500).send({ message: "MongoDB not connected yet" });
        }
    } else {
        next();
    }
});

app.use(DBAccess)
app.use(APICounter)

app.get('/', (req, res) => {
    res.send(`<h1>Hi i am traffic server !</h1>`);
});

app.use('/users' , usersAPI)
app.use('/traffic' , CheckSite , trafficAPI)
app.use('/sites' , sitesAPI)
app.use('/admin' , adminAPI)


app.get('/meta',async (req,res)=>{
    let response = await req.metaCollection.find().toArray()
    res.send(response[0])
})

app.get('/*',(req,res)=>{
    res.send("<h1>Route not found!</h1>")
})

module.exports.handler = serverless(app);