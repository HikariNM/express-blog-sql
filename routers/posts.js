const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');
const checkId = require('../middlewares/checkId');
const checkPost = require('../middlewares/checkPost');

// Index (cRud)
router.get('/', postController.index)

//Show (cRud)
router.get('/:id', checkId, checkPost, postController.show)

//Store (Crud)
router.post('/', postController.store)

//Update (crUd)
router.put('/:id', checkId, checkPost, postController.update)

//Modify (crUd)
router.patch('/:id', checkId, checkPost, postController.modify)

//Destroy (cruD)
router.delete('/:id', checkId, checkPost, postController.destroy)

module.exports = router;