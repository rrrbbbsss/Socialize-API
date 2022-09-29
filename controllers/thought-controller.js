const { User, Thought } = require("../models");

const ThoughtController = {
  getAll(req, res) {
    res.json("todo");
  },
};

module.exports = ThoughtController;
