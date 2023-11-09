const express = require('express')
const mongoose = require('mongoose');

// config environment variables
require('dotenv').config();

const app = express()
const PORT = 6900

// connect to mongodb
const URI = process.env.MONGODB_URI
mongoose.connect(URI)

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    timestamp: Date
})

const Post = mongoose.model('Post', postSchema)

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
        const feed = await Post.find({})

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
        const author = req.body.author
        const content = req.body.content
        const timestamp = req.body.timestamp

        // create post object using parameters
        const post = new Post({
            author: author,
            content: content,
            timestamp: new Date(timestamp)
        })

        // save post into database
        await post.save()

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
    mongoose.connection.close()
})