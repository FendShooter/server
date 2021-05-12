const { posts: Post } = require('../models');

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, post_id: req.user.user_id });
    res.status(201).send({ success: true, post });
  } catch (error) {
    next(error);
  }
};
exports.getPosts = async (req, res, next) => {
  try {
    const post = await Post.findAll();
    res.status(201).send({ success: true, count: post.length, post });
  } catch (error) {
    next(error);
  }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.destroy({ where: { post_id: id } });
    if (!post) return res.status(400).send('Post not found');
    res
      .status(200)
      .send({ success: true, message: 'post has been deleted...' });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
