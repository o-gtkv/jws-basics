require('express-async-errors')
const express = require('express')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const router = require('./routes/main')

const app = express()

app.use(
    express.static('./public'),
    express.json()
)
app.use('/api/v1', router)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`Listen on port ${port}`))
    }
    catch (error) {
        console.log(error)
    }
}

start()