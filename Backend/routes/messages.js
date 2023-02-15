const router = require("express").Router();
const verify = require('./verifyToken');

router.get("/", verify, (req, res) => {
  res.json({
    posts: [
      {
        title: "Test Title",
        body: "This is a test post!",
        author: "Mockup Userino",
      },
    ],
  });
});

module.exports = router;
