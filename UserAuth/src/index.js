const express = require("express");
const cors = require("cors");
require("../src/config/db");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("App listening on port no:", PORT);
});

app.get("/", (req, res) => {
  res.send("welcome to creating Api");
});

// All routes
app.use("/api", require("../src/routes/auth"));
app.use("/api", require("../src/routes/task"));
