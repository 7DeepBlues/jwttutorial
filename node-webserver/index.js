const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const port = 3000

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB!')
)

app.use(express.json())



app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

// app.get('/', (req,res) => res.send('Hello Explorer Soumyadeep!!!') )

app.listen(port, ()=> console.log(`node barebones running on port ${port}!!!`))