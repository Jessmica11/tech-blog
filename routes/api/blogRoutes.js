const express = require('express');
const router = express.Router();
const { addPost, viewPost, addComment } = require('../../controllers/blogController');

router.post('/posts', addPost);
router.get('/posts/:id', viewPost);
router.post('/comments/:postId', addComment);

module.exports = router;
