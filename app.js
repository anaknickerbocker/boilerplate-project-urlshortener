'use strict'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const urlSchema = mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: String,
})
const Urls = mongoose.model('Urls', urlSchema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/shorturl', async (req, res) => {
  const originalUrl = req.body.url
  const shortUrl = Math.floor(Math.random() * 1000)
  const urls = new Urls({ original_url: originalUrl, short_url: shortUrl })
  const result = await urls.save()
  if (!result) {
    console.error('An error occurred while saving.')
  }

  res.json({
    original_url: result ? result['original_url'] : '',
    short_url: result ? result['short_url'] : '',
  })
})

app.get('/api/shorturl/:shortUrl', (req, res) => {
  Urls.findOne({ short_url: req.params.shortUrl }, (err, data) =>
    err ? console.log(err.message) : res.redirect(data['original_url'])
  )
})

export default app
