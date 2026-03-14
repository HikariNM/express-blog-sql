const posts = require('../data/posts');
function checkPost(req, res, next) {
    const id = req.idAsNumber
    //Search for the specific post that matches the given ID 
    const result = posts.find(post => post.id === id);
    //Handle the case where no post matches the given ID
    if (!result) {
        return res.status(404).json({ error: 'Not found', message: `No post found with ID ${id} ` })
    }

    req.postFound = result;
    next()
}

module.exports = checkPost;