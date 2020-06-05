
const express = require('express')

const recordRoutes = require('../controllers/recordController.js')

const router = express.Router()

router.get('/get', recordRoutes.getData)

router.post('/update', recordRoutes.updateData)

module.exports = router