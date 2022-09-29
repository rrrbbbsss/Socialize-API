const mongodb = require("../config/connection");
const { User, Thought } = require("../models");
const userSeeds = require("./user-seeds.json");
const thoughtSeeds = require("./thought-seeds.json");

mongodb.once("open", async () => {
  try {
    // clear out old entries
    await User.deleteMany({});
    await Thought.deleteMany({});

    // seed users
    await User.create(userSeeds);

    // seed thoughts
    await Thought.create(thoughtSeeds);

    // seed thoughts
    // todo
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("----------------");
  console.log("Seeding Complete");
  console.log("----------------");
  process.exit(0);
});
