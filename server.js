const express = require("express");
const routes = require("./routes");
const mongodb = require("./config/connection");

const PORT = 3001;

// setup express
const app = express();
app.use(express.json());
app.use(routes);

// log mongo queries
mongodb.set("debug", true);

// start express
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
