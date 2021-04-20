import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const port = process.env.PORT || 3000
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`)
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
