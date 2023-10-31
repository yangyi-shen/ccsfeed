const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()

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

db.close()