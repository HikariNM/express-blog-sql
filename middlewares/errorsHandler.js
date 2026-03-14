function errorsHandler(err, req, res, next) {
    console.error("DETTAGLIO ERRORE:", err.stack)
    // console.error(req.method, err.message)
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
}

module.exports = errorsHandler;