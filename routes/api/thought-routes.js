const router = require("express").Router();
const ThoughtController = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(ThoughtController.getAll).post(ThoughtController.create);

// /api/thoughts/<thought-id>
router
  .route("/:thoughtId")
  .get(ThoughtController.getOne)
  .put(ThoughtController.update)
  .delete(ThoughtController.delete);

// /api/thoughts/<thought-id>/reactions
router
  .route("/:thoughtId/reactions")
  .post(ThoughtController.addReaction)
  .delete(ThoughtController.removeReaction);

module.exports = router;
