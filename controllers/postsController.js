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
    // const id = Number(req.params.id)

    // const sqlQuery = 'SELECT * FROM posts WHERE id = ?';
    // const paramsQuery = [id];
    // dbConnection.query(sqlQuery, paramsQuery, (error, rows) => {
    //     if (error) {
    //         res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
    //     }
    //     //Extract the single post objectd
    //     res.json(rows[0])
    // })

    const id = Number(req.params.id)

    const sqlQuery = 'SELECT * FROM posts WHERE id = ?';
    const relationsQuery = `
                            SELECT tags.label
                            FROM post_tag
                            JOIN tags
                            ON post_tag.tag_id = tags.id
                            WHERE post_id = ? 
                            `;
    const paramsQuery = [id];
    dbConnection.query(sqlQuery, paramsQuery, (error, rows) => {
        if (error) {
            res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
        }
        const post = rows[0];


        dbConnection.query(relationsQuery, paramsQuery, (error, results) => {
            if (error) {
                res.status(500).json({ error: "DB Error", message: "Error retrieving data from the database" });
            }

            post.label = results.map(tag => tag.label);
            console.log(post)
            //Extract the single post objectd
            res.json(post);
        })
    })

}

//Store (Crud)
function store(req, res) {
    console.log(`You requested to create a new post`, req.body)
    // const title = req.body.title
    // const content = req.body.content
    // const image = req.body.image

    const { title, content, image } = req.body

    const sqlQuery = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)';
    const paramsQuery = [title, content, image];

    dbConnection.query(sqlQuery, paramsQuery, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Cannot add post', message: 'Could not create the new post' })
        }

        console.log(result);
        return res.status(201).json({ id: result.insertId })
    })

}

//Update (crUd)
function update(req, res) {
    console.log(`You requested to update the post with id ${req.params.id}`, req.body)
    const { title, content, image } = req.body
    const id = Number(req.params.id)

    const sqlQuery = 'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?';
    const paramsQuery = [title, content, image, id];

    dbConnection.query(sqlQuery, paramsQuery, (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Cannot update', message: 'Could not update the selected post' })
        }

        if (rows.affectedRows === 0) {
            return res.status(404).json({ error: 'Resource Not Found', message: 'Unable to update: no post found matching the provided id' })
        }

        return res.json({ message: 'post updated' });
    })
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