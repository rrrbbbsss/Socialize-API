const express = require("express");
const routes = require("./routes");
const mongodb = require("./config/connection");

const PORT = 3001;

// setup express
const app = express();
app.use(express.json());
app.use(routes);

// connect to db and start express
mongodb.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
