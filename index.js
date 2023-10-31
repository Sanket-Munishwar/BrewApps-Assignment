const express = require("express");
const route = require('./src/routes/route')
const mongoose = require("mongoose");
const app = express();

mongoose.set("strictQuery", true);

app.use(express.json());

mongoose.connect(
    "mongodb+srv://sanketmunishwar7:q5WEY4lK4vMAzwbJ@cluster0.0jenlvx.mongodb.net/BrewApps?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
 .then(() => console.log("DB is Connected"))
 .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, function () {
  console.log("Express app running on port" + 3000);
});