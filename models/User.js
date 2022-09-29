const { Schema, model } = require("mongoose");
const { User } = require(".");

// good enough regex for email validation: https://emailregex.com
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "You need to provide a username!",
      trum: true,
    },
    email: {
      type: String,
      required: "You need to provide a username!",
      unique: true,
      match: emailRegex,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// get count of friends on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the model
const User = model("User", UserSchema);

module.exports = User;
