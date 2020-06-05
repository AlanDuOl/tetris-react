
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Import routes
const recordRoutes = require('./routes/recordRoute.js')

const PORT = process.env.PORT || 4000

// create app
const app = express()

// Apply midlewares to app
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add routes to app
app.use('/record', recordRoutes)

// Implement server error routes (500)
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error on server...')
})

// Implement req/client error (404)
app.use(function(req, res, next) {
    res.status(404).send('Page not found...')
})

// Start the app
app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})