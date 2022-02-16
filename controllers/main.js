require('dotenv').config()
const jwt = require('jsonwebtoken')
const { CustomAPIError } = require('../errors/custom-error')

const login = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password)
        throw new CustomAPIError('Name and password required!', 401)
    const token = await jwt.sign(
        {
            name,
            password
        },
        process.env.JWT_TOKEN,
        {
            expiresIn: '1h'
        }
    )
    res.status(200).json({
        token
    })
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader && !authHeader.startsWith('Bearer'))
        throw new CustomAPIError('Authorization error.', 401)
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    res.status(200).send({
        name: decoded.name,
        number: String(Math.floor(Math.random() * 100))
    })
}

module.exports = {
    dashboard,
    login
}