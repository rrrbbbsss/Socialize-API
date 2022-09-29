const { User, Thought } = require("../models");

const UserController = {
  getAll(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
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
      .populate({
        path: "friends",
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
  // todo verify that deletes associated thoughts
  delete(req, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbPizzaData) => {
        !dbData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("there was an error");
      });
  },
  // todo...
  addFriend(req, res) {},
  // todo...
  removeFriend(req, res) {},
};

module.exports = UserController;
