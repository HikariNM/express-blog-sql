function errorsHandler(err, req, res, next) {
    console.error(req.method, err.message)
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
}

module.exports = errorsHandler;