const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var port = process.env.PORT
const PORT = port || 5000
const MongoUrl = "mongodb+srv://startupseed:fPfsQ4SLYHxbGv2Q@startupseed.rlvehoj.mongodb.net/test"

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
app.use(bodyParser.text({ limit: '200mb' }))

// Localhost
app.use('/api/auth', require('./server/routes/authRouter'))
app.use('/api', require('./server/routes/verifyRouter'))
app.use('/api', require('./server/routes/projectRouter'))

// DEPLOY //
// app.use('/auth', require('./server/routes/authRouter'))
// app.use('/', require('./server/routes/verifyRouter'))
// app.use('/', require('./server/routes/projectRouter'))

async function start() {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`app started, ${PORT}`))
  } catch(e) {
    console.log('error', e.message);
    process.exit(1)
  }
}

start()