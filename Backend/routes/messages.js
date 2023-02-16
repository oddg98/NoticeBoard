const router = require("express").Router();
const Post = require('../models/Post');
const verify = require('./verifyToken');

router.post("/create", verify, async (req, res) => {
  // Validate post

  // Create post
  const boardPost = new Post({
    postTitle: req.body.title,
    postAuthor: req.body.author,
    postContent: req.body.content,
  });

  // Save post
  try {
    const savedPost = await boardPost.save();
    res.send({ success: true });
  } catch (err) {
    res.status(400).send(err);
  }
})

router.get("/", verify, (req, res) => {
  Post.find({}, (err, posts) => {
    res.json(posts);
  });
});

module.exports = router;
