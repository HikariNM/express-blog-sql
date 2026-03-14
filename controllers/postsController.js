const { error } = require('console');
const dbConnection = require('../data/dbConnection');


//Index (cRud) case-insensitive
function index(req, res) {

    const sqlQuery = 'SELECT * FROM posts'
    dbConnection.query(sqlQuery, (error, rows) => {
        console.log('Connection to Index')
        if (error) {
            return res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }
        let results = rows;
        res.json(results)
    })

}



//Destroy (cruD)
function destroy(req, res) {
    const id = Number(req.params.id)

    const sqlQuery = 'DELETE FROM posts WHERE id = ?';
    const paramsQuery = [id];
    dbConnection.query(sqlQuery, paramsQuery, error => {
        if (error) {
            res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }
    })
    console.log(`Deleted post with ID ${id}`)

    //Send status 204 (No Content) to confirm successful deletion
    return res.sendStatus(204)
}

//Show (cRud)
function show(req, res) {
    const id = Number(req.params.id)

    const sqlQuery = 'SELECT * FROM posts WHERE id = ?';
    const paramsQuery = [id];
    dbConnection.query(sqlQuery, paramsQuery, (error, rows) => {
        if (error) {
            res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }
        let result = rows;
        //Return the found post as a JSON object
        res.json(result)
        // console.log(result)
    })

}

//Store (Crud)
function store(req, res) {
    console.log(`You requested to create a new post`, req.body)
}

//Update (crUd)
function update(req, res) {
    console.log(`You requested to update the post with id ${req.params.id}`, req.body)
}

//Modify (crUd)
function modify(req, res) {
    console.log(`You requested to modify the post with id ${req.params.id}`, req.body)

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}