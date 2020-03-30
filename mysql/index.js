const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const router = require('./network')

const app = express()

app.use(bodyParser.json())

// ROUTES
app.use('/', router)

app.listen(config.mysqlService.port, () => {
  console.log('mysql service listen in port ', config.mysqlService.port)
})