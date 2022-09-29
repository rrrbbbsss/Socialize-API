const { User, Thought } = require("../models");

const ThoughtController = {
  getAll(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  getOne(req, res) {
    Thought.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((dbData) =>
        !dbData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbData)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  // todo need to push this to associated user's thoughts array field
  create(req, res) {
    Thought.create(req.body)
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  // todo
  update(req, res) {},
  // todo
  delete(req, res) {},
  // todo
  addReaction(req, res) {},
  // todo
  removeReaction(req, res) {},
};

module.exports = ThoughtController;
