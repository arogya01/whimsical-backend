const dbConnect = require("../database/config");

const { client } = dbConnect;

module.exports.createBlog = async function createBlog(newUser, res) {
  const result = await client
    .db("whimsical")
    .collection("users")
    .insertOne(newUser);
  console.log(`New User Created with the following id: ${result.insertedId}`);
  res.send({ message: "user registered" });
};

module.exports.findBlog = async function findBlog(user) {
  const result = await client.db("whimsical").collection("users").findOne(user);
  console.log("The User has been found: ", result);
  // res.send({message:"user logged in"});
  return result;
};

module.exports.deleteBlog = async function deleteBlog(){

}

module.exports.updateBlog = async function updateBlog(){

}

