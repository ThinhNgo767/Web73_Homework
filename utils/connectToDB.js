const { MongoClient } = require("mongodb");

// Connect MongoDB URL
const mongoDBUrl = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(mongoDBUrl);

// Database Name
const dbName = "web73-homework";
const db = {};

const connectToDB = async () => {
  await client.connect();
  console.log("Connected successfully to database");
  
  const database = client.db(dbName);
  db.teachers = database.collection("teachers");
  db.students = database.collection("students");
  db.users = database.collection("users");
};

module.exports = { connectToDB, db };
