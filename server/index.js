const express = require('express')
const mongodb = require('mongodb')

// config environment variables
require('dotenv').config();

const app = express()
const PORT = 6900

// connect to mongodb
const uri = process.env.MONGODB_URI
const client = new mongodb.MongoClient(uri, {
    serverApi: '1'
})
client.connect()

// allow http requests from any source
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
});

// parse data from api requests into json form
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the backend for cssfeed!')
})

app.get('/feed', async (req, res) => {
    try {
        // make sure database is open
        await client.connect()

        // select posts database
        const db = client.db('ccsfeed');
        const posts = db.collection('posts-notime')

        const feed = await posts.find({}).toArray()

        res.json({
            success: true,
            feed: feed
        })
    } catch (err) {
        console.error(err)
        res.json({
            success: false
        })
    }
})

app.post('/newpost', async (req, res) => {
    try {
        // make sure database is open
        await client.connect()

        // select posts database
        const db = client.db('ccsfeed');
        const posts = db.collection('posts-notime')

        const author = req.body.author
        const content = req.body.content
        const timestamp = req.body.timestamp

        const post = {
            author: author,
            content: content,
            timestamp: new Date(timestamp)
        }

        await posts.insertOne(post)

        res.json({
            success: true
        })
    } catch (err) {
        console.error(err)
        res.json({
            success: false
        })
    }
})

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})

process.on('exit', () => {
    client.close();
})