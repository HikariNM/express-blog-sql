const { error } = require('console');
const dbConnection = require('../data/dbConnection');


//Index (cRud) case-insensitive
function index(req, res) {

    //Define the SQL query to select all records from the 'posts' table
    const sqlQuery = 'SELECT * FROM posts'

    //Execute the database query
    dbConnection.query(sqlQuery, (error, rows) => {
        console.log('Connection to Index')

        //Error handling
        if (error) {
            return res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }

        let results = rows;

        //Send the data back in JSON format
        res.json(results)
    })

}



//Destroy (cruD)
function destroy(req, res) {
    //Get the post ID from the request parameters and convert it to a Number
    const id = Number(req.params.id)

    //SQL query use a placeholder ? to prevent SQL Injection
    const sqlQuery = 'DELETE FROM posts WHERE id = ?';
    const paramsQuery = [id];

    //Execute the database query
    dbConnection.query(sqlQuery, paramsQuery, error => {
        //Error handling
        if (error) {
            res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }
    })
    console.log(`Deleted post with ID ${id}`)

    //Send status 204 (No Content) to confirm success
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
        //Extract the single post objectd
        let result = rows[0];

        res.json(result)

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