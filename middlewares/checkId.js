const dbConnection = require('../data/dbConnection');

function checkId(req, res, next) {
    //Convert the ID from string parameters to a Number
    const id = Number(req.params.id);
    //Validate that the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Bad Request', message: `${id} is not a valid number` })
    }

    const sqlQuery = 'SELECT id FROM posts WHERE id = ?';
    dbConnection.query(sqlQuery, id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Not Found', message: `No post found with ID ${id}` });
        }
    })
    req.idAsNumber = id;
    next()
}

module.exports = checkId;