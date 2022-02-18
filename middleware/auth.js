const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authorizationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader && !authHeader.startsWith('Bearer'))
        throw new UnauthenticatedError('No token provided .')
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const { id, name } = decoded
        req.user = { id, name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route.')
    }
}

module.exports = authorizationMiddleware