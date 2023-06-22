const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const UserRoute = require("./Routes/UserRoute");
const TaskRoute = require("./Routes/TaskRoute");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", UserRoute);
app.use("/api/tasks", TaskRoute);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
