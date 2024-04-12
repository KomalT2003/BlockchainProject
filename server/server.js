const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const app = express();
const port = 5000;

const uri =
  "mongodb+srv://Vikas_03:D%5Fboss%4021@cluster0.ylxyhsz.mongodb.net/health?retryWrites=true&w=majority";

// Initialize MongoDB client and database
const mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true });
let db;

async function connectToMongoDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db("health");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

connectToMongoDB();

// Middleware to parse JSON request body
app.use(express.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {

    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the "users" collection
    const result = await db.collection("users").insertOne({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Failed to create user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the "users" collection
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the password hash with the provided password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);


    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Failed to authenticate user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
