const express = require('express')
const app = express()
const PORT = 5000


app.use(express.json({ extended: true }))

async function start() {
  try {
    app.listen(PORT, () => console.log(`app started, ${PORT}`))
  } catch (e) {
    console.log('error', e.message);
    process.exit(1)
  }
}

start()