const { User, Thought } = require("../models");

const UserController = {
  getAll(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  getOne(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
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
    User.create(req.body)
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  update(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
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
  delete(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbData) => {
        !dbData
          ? res.status(404).json({ message: "No user found with this id" })
          : Thought.deleteMany({ _id: dbData.thoughts }).then((dbData) =>
              res.json("User and associated thoughts deleted")
            );
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addtoSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
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
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
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
};

module.exports = UserController;
