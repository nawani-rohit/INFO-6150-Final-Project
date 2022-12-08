
const express = require('express')
require('dotenv').config()
const connection = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const cors = require('cors')
const path = require('path')

// body parser middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// cors
app.use(cors())

// router
app.use('/api', require('./routes/adRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))