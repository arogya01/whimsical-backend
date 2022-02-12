const express = require("express");
const router = express.Router();
const dbConnect = require("../database/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userControllers = require("../controllers/user");
require("dotenv").config();

const { createUser, findUser, generateAccessToken, generateRefreshToken } =
  userControllers;

let refreshTokens = [];
router.post("/signup", async (req, res) => {
  const saltRounds = 10;

  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const name = req.body.name;
  const isAdmin = false;

  console.log(password);

  await createUser(
    {
      email: email,
      name: name,
      password: password,
      isAdmin: isAdmin,
    },
    res
  );
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).json({ error: "please add email or password" });
  }

  const userInfo = await userControllers.findUser({ email: email });

  if (userInfo) {
    const match = await bcrypt.compare(req.body.password, userInfo.password);
    if (match) {
      const accessToken = generateAccessToken({ user: req.body.name });
      const refreshToken = generateAccessToken({ user: req.body.name });

      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } else res.status(404).json({ error: "user not found" });
});

router.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token)) {
    res.status(400).send("refresh token invalid");
  }

  refreshTokens = refreshTokens.filter((c) => {
    c !== req.body.token;
  });

  const accessToken = generateAccessToken({ user: req.body.name });
  const refreshToken = generateRefreshToken({ user: req.body.name });

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => {
    c !== req.body.token;
  });

  res.status(203).send("Logged Out !!! ");
});

module.exports = router;
