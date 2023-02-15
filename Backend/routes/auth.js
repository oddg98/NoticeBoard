const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validations");

// POST Register
router.post("/register", async (req, res) => {
  // Validate Data
  const validation = registerValidation(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
  } else {
    // Avoid duplicated user
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({
        errMsg: "A user with this email already exists!",
        errCode: 1001,
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user
    try {
      const savedUser = await user.save();
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

// POST Login
router.post("/login", async (req, res) => {
  // Validate Data
  const validation = loginValidation(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
  } else {
    // Find user in DB
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res
        .status(400)
        .send({ errMsg: "Wrong email or password.", errCode: 1002 });
    }
    // Verify password
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ errMsg: "Wrong email or password.", errCode: 1002 });
    // Login success
    const token = jwt.sign({ _id: existingUser._id }, process.env.MASTER_KEY);
    res.header('auth-token', token).send({
      msg: `Logged in succesfully!`,
      token: token
    });
  }
});

module.exports = router;
