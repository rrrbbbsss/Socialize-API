const { Schema, model, Types } = require("mongoose");
const formatDate = require("../utils/formatDate");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Reaction Body required!",
      maxLength: 280,
    },
    username: {
      type: String,
      required: "Username required!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought text required!",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
    username: {
      type: String,
      required: "Username required!",
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// retrieves the count of reactions on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thought Model
const Thought = model("Thought", ThoughtSchema);

// exports
module.exports = Thought;
