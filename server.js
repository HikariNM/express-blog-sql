const express = require('express') //Import express framework
const postsRouter = require('./routers/posts'); //Import the router for posts entity
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');
const checkTime = require('./middlewares/checkTime');

const app = express() //Initialize the express application
const port = 3000 //Define the server port


app.use(express.static('public')); //Configure static assets (images, css, etc.) to be served from the 'public' folder
app.use(express.json()) //Allows the server to read data sent in the request body (req.body)

//Main Route
app.get('/', (req, res) => {
    console.log('Chiamata effettuatata!')
    res.send('Server del mio Blog!') //Text response
})


app.use(checkTime)
app.use('/posts', postsRouter)// Setup posts routes with '/posts' prefix
app.use(notFound)
app.use(errorsHandler)

//Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
