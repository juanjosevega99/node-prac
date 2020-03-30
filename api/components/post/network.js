const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// ROUTES
router.get('/', list)

// FUNCTIONS
function list(req, res, next) {
  controller.list()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = router