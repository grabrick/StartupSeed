const express = require('express')
const mongoose = require('mongoose')
const app = express()
var port = process.env.PORT
const PORT = port || 5000
const MongoUrl = "mongodb+srv://startupseed:fPfsQ4SLYHxbGv2Q@startupseed.rlvehoj.mongodb.net/test"


app.use(express.json({ extended: true }))
app.use('/api/auth', require('./server/routes/authRouter'))

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