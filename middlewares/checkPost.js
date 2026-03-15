const dbConnection = require('../data/dbConnection');
function checkPost(req, res, next) {
    const id = req.idAsNumber
    //Search for the specific post that matches the given ID 

    const sqlQuery = 'SELECT * FROM posts WHERE id = ?';
    dbConnection.query(sqlQuery, id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Not Found', message: `No post found with ID ${id}` });
        }
        req.postFound = result;
        next()
    })

}

module.exports = checkPost;