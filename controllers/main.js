require('dotenv').config()
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password)
        throw new BadRequestError('Name and password required!')
    const id = new Date().getDate()
    const token = await jwt.sign(
        {
            id,
            name
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
    res.status(200).send({
        name: req.user.name,
        number: String(Math.floor(Math.random() * 100))
    })
}

module.exports = {
    dashboard,
    login
}