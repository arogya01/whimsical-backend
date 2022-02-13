const dbConnect = require("../database/config");

const { client } = dbConnect;
const jwt = require("jsonwebtoken");

module.exports.createUser = async function createUser(newUser, res) {
  const result = await client
    .db("whimsical")
    .collection("users")
    .insertOne(newUser);
  console.log(`New User Created with the following id: ${result.insertedId}`);
  res.send({ message: "user registered" });
};

module.exports.findUser = async function findUser(user) {
  const result = await client.db("whimsical").collection("users").findOne(user);
  console.log("The User has been found: ", result);
  // res.send({message:"user logged in"});
  return result;
};

module.exports.generateAccessToken = function generateAccessToken(user) {
  console.log(process.env.SECRET_KEY_ACCESS);
  return jwt.sign(user, process.env.SECRET_KEY_ACCESS, { expiresIn: "15m" });
};

module.exports.generateRefreshToken = function generateRefreshToken(user) {
  console.log(process.env.SECRET_KEY_REFRESH);
  return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: "20m" });
};
