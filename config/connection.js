const mongoose = require("mongoose");

// connect to mognodb
mongoose.connect("mongodb://127.0.0.1:27017/socialize-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
