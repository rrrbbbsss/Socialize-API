const router = require("express").Router();
const UserController = require("../../controllers/user-controller");

// /api/users
router.route("/").get(UserController.getAll).post(UserController.create);

// /api/users/<user-id>
router
  .route("/:userId")
  .get(UserController.getOne)
  .put(UserController.update)
  .delete(UserController.delete);

// /api/users/<user-id>/friends/<friend-id>
router
  .route("/")
  .post(UserController.addFriend)
  .delete(UserController.removeFriend);

module.exports = router;
