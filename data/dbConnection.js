const mysql = require('mysql2')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog_db'
}

function onDbConnection(error) {
    if (error) throw error;

    console.log('Database connected successfully');
}

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect(onDbConnection);

module.exports = dbConnection