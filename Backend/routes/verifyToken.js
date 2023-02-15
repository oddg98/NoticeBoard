const jwt = require("jsonwebtoken");

module.exports = (req, res, next)  => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, process.env.MASTER_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send("Invalid token.");
  }
}