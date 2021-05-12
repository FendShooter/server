const express = require('express');
const auth = require('../auth/auth');
const {
  createPost,
  getPosts,
  deletePost,
} = require('../controllers/postController');
const {
  createUser,
  getUsers,
  loginUser,
  currentUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();
// user ROUTE
router.get('/users', auth, getUsers);
router.get('/user', auth, currentUser);
router.post('/new-user', createUser);
router.post('/login', loginUser);
router.patch('/update', auth, updateUser);
router.delete('/user/delete', auth, deleteUser);

// POST ROUTE

router.post('/posts/post', auth, createPost);
router.get('/posts/post', auth, getPosts);
router.delete('/posts/post/:id', auth, deletePost);
module.exports = router;
