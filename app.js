// require('dotenv').config()
const express = require('express')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
require('express-async-errors')

const app = express()

app.use(
    express.static('./public'),
    express.json()
)

app.use(
    errorHandlerMiddleware,
    notFoundMiddleware
)

const port = process.env.PORT || 3000
try {
    app.listen(port, () => console.log(`Listen on port ${port}`))
}
catch (error) {
    console.log(error)
}