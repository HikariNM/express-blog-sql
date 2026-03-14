function checkId(req, res, next) {
    //Convert the ID from string parameters to a Number
    const id = Number(req.params.id);
    //Validate that the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Bad Request', message: `${id} is not a valid number` })
    }
    req.idAsNumber = id;
    next()
}

module.exports = checkId;