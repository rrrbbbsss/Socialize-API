const router = require("express").Router();
const userRoutes = require("./user-routes");
// todo thought-routes

router.use("/users", userRoutes);
//todo use thought-routes

module.exports = router;
