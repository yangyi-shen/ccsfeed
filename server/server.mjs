import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import dotenv from 'dotenv'

// for image processing
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

// config environment variables
dotenv.config()

// remove mongoose warning about 6.10.1 being deprecated
mongoose.set('strictQuery', false)

const app = express()
const PORT = 6900

// connect to mongodb
const URI = process.env.MONGODB_URI
mongoose.connect(URI)

// set up image file processing
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    timestamp: Date,
    image: {
        buffer: Buffer,
        mimetype: String,
        type: Object
    }
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
})

// parse data from api requests into json form
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the backend for cssfeed!')
})

// user authentication APIs
app.get('/login', async (req, res) => {
    try {
        const { username, password } = req.query

        const user = await User.findOne({ username })

        // check if user exists
        if (!user) {
            return res.json({
                success: false
            })
        }

        // check if passwords match
        const passwordLegit = bcrypt.compare(password, user.password)

        if (!passwordLegit) {
            return res.json({
                success: false
            })
        }

        // if everything ok, return success message!
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

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10)

        // check if user already exists
        const user = await User.findOne({ username })

        if (user) {
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
        const feed = await Post.find({}).sort({ timestamp: -1 }).limit(40)

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

app.post('/newpost', upload.single('image'), async (req, res) => {
    try {
        const { author, content, timestamp } = req.body

        const { buffer, mimetype } = req.file || [null, null]

        // check if file is an image
        if (buffer && mimetype.startsWith('image')) {
            // compress buffer
            const compressedBuffer = await imagemin.buffer(buffer, {
                plugins: [
                    imageminMozjpeg({ quality: 80 }), // Adjust quality as needed
                    imageminPngquant({ quality: [0.6, 0.8] }), // Adjust quality as needed
                ],
            })

            // create post object using parameters
            const post = new Post({
                author: author,
                content: content,
                timestamp: new Date(timestamp),
                image: {
                    buffer: compressedBuffer,
                    mimetype: mimetype,
                },
            })

            // save post into the database
            await post.save()

            return res.json({
                success: true,
            })
        } else {
            // Handle the case when no image is uploaded
            const post = new Post({
                author: author,
                content: content,
                timestamp: new Date(timestamp),
                image: {
                    buffer: buffer,
                    mimetype: mimetype
                }
            })

            // save post into the database
            await post.save()

            return res.json({
                success: true,
            })
        }
    } catch (err) {
        console.error(err)
        return res.json({
            success: false,
        })
    }
})

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})

process.on('exit', () => {
    mongoose.connection.close()
})
