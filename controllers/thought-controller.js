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
  create(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbData) =>
        !dbData
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(dbData)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  update(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        !dbData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  delete(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbData) => {
        !dbData
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  // todo
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        !dbData
          ? res.status(404).json({ message: "No Thought found with this id" })
          : res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  // todo (also update route for reactionId)
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { friends: req.params.reactionId } },
      { new: true }
    )
      .then((dbData) => {
        !dbData
          ? res.status(404).json({ message: "No Thought found with this id" })
          : res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
};

module.exports = ThoughtController;
