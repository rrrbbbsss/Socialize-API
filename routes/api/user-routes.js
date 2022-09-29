const router = require("express").Router();
const UserController = require("../../controllers/user-controller");

// /api/users
router.route("/").get(UserController.getAll);

// /api/urser/<id>

module.exports = router;
