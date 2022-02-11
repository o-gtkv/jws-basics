class CustomAPIError extends Error {
    constructor(message, status) {
        super(message)
        this.statusCode = status
    }
}

const createCustomAPIError = (message, status) => {
    return new CustomAPIError(message, status)
}

module.exports = {
    createCustomAPIError,
    CustomAPIError
}