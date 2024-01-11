const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwtpass = "eq34nfdn4";

mongoose.connect("mongodb://localhost:27017/netflixclone");

const Usern = mongoose.model("User", {
  username: String,
  password: String,
});

function authMiddleware(req, res, next) {
  const username = req.body.usern;
  Usern.findOne({ username: username }).then((value) => {
    if (value) {
      res.json({ result: "TryAgain" });
    } else {
      next();
    }
  });
}

function authMiddlewareSignin(req, res, next) {
  const username = req.body.usern;
  Usern.findOne({ username: username }).then((value) => {
    if (value) {
      if (value.password === req.body.passw) {
        next();
      } else {
        res.json({ result: "NoUser" });
      }
    } else {
      res.json({ result: "NoUser" });
    }
  });
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/", authMiddleware, async (req, res) => {
  const user = req.body;

  const u1 = new Usern({
    username: user.usern,
    password: user.passw,
  });

  u1.save();
  res.json({ result: "Success" });
});

app.post("/signin", authMiddlewareSignin, async (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, jwtpass);
  res.json({ result: token });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
