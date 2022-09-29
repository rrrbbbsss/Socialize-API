const router = require("express").Router();
const ThoughtController = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(ThoughtController.getAll);
// todo rest of it...

module.exports = router;
