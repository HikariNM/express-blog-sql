function checkTime(req, res, next) {

    const now = new Date().toLocaleString();
    console.log("Request received", now);

    next();
}

module.exports = checkTime;