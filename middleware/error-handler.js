const { CustomAPIError } = require('../errors')
const { StatusCodes, getReasonPhrase } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.status).json({
            msg: err.message
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    })
}

module.exports = errorHandlerMiddleware