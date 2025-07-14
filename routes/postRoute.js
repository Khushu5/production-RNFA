const express =require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController } = require('../controllers/postController');

// router object
const router = express.Router()

//Create post  || POST

router.post('/create-post', requireSignIn,createPostController)


// get All Posts
router.get('/get-all-post',getAllPostsController)

// get user Posts
router.get('/get-user-post',requireSignIn,getUserPostsController)

//delete post
router.delete('/delete-post/:id',requireSignIn,deletePostController)

//Update post 
router.put('/update-post/:id',requireSignIn,updatePostController)


//export 
module.exports =router;