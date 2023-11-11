const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const Post = mongoose.model('Post', postSchema, 'posts')
const User = mongoose.model('User', userSchema, 'users')

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

// user authentication APIs
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10)

        // check if user already exists
        const user = await User.findOne({ username })

        if (user !== null) {
            return res.json({
                success: false
            })
        } else {
            // create user
            const newUser = new User({
                username: username,
                password: encryptedPassword
            })
            await newUser.save()

            // return success message
            return res.json({
                success: true
            })
        }
    } catch (err) {
        console.error(err)
        return res.json({
            success: false
        })
    }
})

// content management APIs
app.get('/feed', async (req, res) => {
    try {
        const feed = await Post.find({})

        return res.json({
            success: true,
            feed: feed
        })
    } catch (err) {
        console.error(err)
        return res.json({
            success: false
        })
    }
})

app.post('/newpost', async (req, res) => {
    try {
        const { author, content, timestamp } = req.body

        // create post object using parameters
        const post = new Post({
            author: author,
            content: content,
            timestamp: new Date(timestamp)
        })

        // save post into database
        await post.save()

        return res.json({
            success: true
        })
    } catch (err) {
        console.error(err)
        return res.json({
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
