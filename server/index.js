const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the backend for cssfeed!')
})