const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')

const app = express()
const http = require('http').Server(app);
const cors = require('cors');
var port = process.env.PORT
const PORT = port || 5000
const MongoUrl = "mongodb+srv://startupseed:fPfsQ4SLYHxbGv2Q@startupseed.rlvehoj.mongodb.net/test"

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.text({ limit: '200mb' }))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(compression());
app.use(cors());

// Localhost
app.use('/api/auth', require('./server/routes/authRouter'))
app.use('/api', require('./server/routes/verifyRouter'))
app.use('/api', require('./server/routes/projectRouter'))
app.use('/api', require('./server/routes/specialistRouter'))
app.use('/api', require('./server/routes/favoriteRouter'))
app.use('/api', require('./server/routes/messengerRouter'))
app.use('/api', require('./server/routes/adminRouter'))

// DEPLOY //
// app.use('/auth', require('./server/routes/authRouter'))
// app.use('/', require('./server/routes/verifyRouter'))
// app.use('/', require('./server/routes/projectRouter'))
// app.use('/', require('./server/routes/specialistRouter'))
// app.use('/', require('./server/routes/favoriteRouter'))
// app.use('/', require('./server/routes/messengerRouter'))
// app.use('/', require('./server/routes/adminRouter'))

async function start() {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    http.listen(PORT, () => console.log(`app started, ${PORT}`))
  } catch (e) {
    console.log('error', e.message);
    process.exit(1)
  }
}

start()