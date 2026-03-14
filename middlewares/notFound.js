function notFound(req, res, next) {
    console.log('Page not found')
    res.status(404).json({ error: 'Page not found' })
}

module.exports = notFound;