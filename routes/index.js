const router = require("express").Router();
const apiRoutes = require("./api");

// use api routes
router.use("/api", apiRoutes);

// default response
router.use((req, res) => {
  res.status(404).json("404 Error");
});

module.exports = router;
