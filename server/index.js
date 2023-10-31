const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const PORT = 6900

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

app.get('/feed', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            console.error(err)
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true,
                feed: rows
            })
        }
    })
})

app.post('/newpost', (req, res) => {
    // make sure database is open
    let db = new sqlite3.Database('./ccsfeed.db')

    const author = req.body.author
    const content = req.body.content
    const timestamp = req.body.timestamp

    db.run('INSERT INTO posts(author, content, timestamp) VALUES(?, ?, ?)', [author, content, timestamp], (err) => {
        if (err) {
            console.error(err)
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})

// close database
db.close()