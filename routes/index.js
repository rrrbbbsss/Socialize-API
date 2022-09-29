const router = require("express").Router();
// todo import api routes

// todo use api routes

// default response
router.use((req, res) => {
  res.status(404).json("404 Error");
});

module.exports = router;
