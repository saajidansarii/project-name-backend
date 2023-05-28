const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

const bodyParser = require("body-parser");
require("dotenv").config();
//app

// To connect with your mongoDB database
// db
mongoose.connect(
  `mongodb+srv://ansari007sajid:ansarisajid@auth-1.rbvdur6.mongodb.net/`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const conSuccess = mongoose.connection;
conSuccess.once("open", (_) => {
  console.log("Database connected:", "auth");
});

conSuccess.on("error", (err) => {
  console.error("connection error:", err);
});

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("users", UserSchema);
//middlewares

// app.use(bodyParser.json());
app.use(express.json());
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, resp) => {
  resp.send("App is Working");
  // You can check backend is working or not by
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

app.post("/register", async (req, resp) => {
  try {
    debugger;
    const user = new User(req.body);
    let result = await user.save();

    debugger;
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    debugger;
    resp.send("Something Went Wrong");
  }
});
