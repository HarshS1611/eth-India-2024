const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://sagasv001:kfFPogDCrzU4R4S4@cluster0.dp0ur.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Schema and Model
const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  startDistance: { type: Number, required: true },
  endDistance: { type: Number, required: true },
});

const Activity = mongoose.model("Activity", activitySchema);

// Schema and Model for Challenge
const challengeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  challengeName: { type: String, required: true },
  target: { type: Number, required: true },
  targetType: { type: String, required: true }, // e.g., "steps", "distance", "time"
  id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
});

const p2cSchema = new mongoose.Schema({
  category: { type: String, required: true },
  challengeName: { type: String, required: true },
  target: { type: Number, required: false },
  targetType: { type: String, required: false }, // e.g., "steps", "distance", "time"
  id: { type: String, required: false, unique: true },
  amount: { type: Number, required: true },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
const P2C = mongoose.model("P2C", p2cSchema);

// API to Create a P2C Challenge
app.post("/p2c", async (req, res) => {
  try {
    const { category, challengeName, id, amount } = req.body;
    if (!category || !challengeName || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the new challenge
    const newChallenge = new P2C({
      category,
      challengeName,
      amount,
      id,
    });

    const savedChallenge = await newChallenge.save();
    console.log(savedChallenge);
    res.status(201).json(savedChallenge);
  } catch (error) {
    // Handle unique constraint errors
    if (error.code === 11000) {
      return res.status(409).json({ message: "Challenge ID must be unique" });
    }

    res.status(500).json({ message: "Error creating challenge", error });
  }
});

// API to Fetch All P2C Challenges
app.get("/p2cchallenges", async (req, res) => {
  try {
    const challenges = await P2C.find(); // Fetch all challenges
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching challenges", error });
  }
});

// API to Create an Activity for athlete 1
app.post("/activities1", async (req, res) => {
  try {
    const { name, startTime, endTime, startDistance, endDistance } = req.body;
    const newActivity = new Activity({
      name,
      startTime,
      endTime,
      startDistance,
      endDistance,
    });

    const savedActivity = await newActivity.save();
    console.log(savedActivity);
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error creating activity", error });
  }
});

//API to Get activity details for athlete 1
app.get("/activities1/:id", async (req, res) => {
  try {
    const activities = await Activity.findById(req.params.id);
    if (!activities) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error getting activity", error });
  }
});

//API to Create an activity for athlete 2
app.post("/activities2", async (req, res) => {
  try {
    const { name, startTime, endTime, startDistance, endDistance } = req.body;
    const newActivity = new Activity({
      name,
      startTime,
      endTime,
      startDistance,
      endDistance,
    });

    const savedActivity = await newActivity.save();
    console.log(savedActivity);
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error creating activity", error });
  }
});

//API to Get activity details for athlete 2
app.get("/activities2/:id", async (req, res) => {
  try {
    const activities = await Activity.findById(req.params.id);
    if (!activities) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error getting activity", error });
  }
});

// API to Update an Activity
app.patch("/activities1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startTime, endTime, startDistance, endDistance } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { name, startTime, endTime, startDistance, endDistance },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error });
  }
});

app.patch("/activities2/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startTime, endTime, startDistance, endDistance } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { name, startTime, endTime, startDistance, endDistance },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error });
  }
});

// API to Create a Challenge
app.post("/challenges", async (req, res) => {
  // console.log(req.body);
  try {
    const {
      category,
      challengeName,
      target,
      targetType,
      id,
      amount,
      wagerCurrency,
    } = req.body;

    // Validation
    if (
      !category ||
      !challengeName ||
      !target ||
      !targetType ||
      !id ||
      !amount ||
      !wagerCurrency
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the new challenge
    const newP2PChallenge = new Challenge({
      category,
      challengeName,
      target,
      targetType,
      id,
      amount,
    });

    console.log(newP2PChallenge);

    const savedChallenge = await newP2PChallenge.save();
    console.log(savedChallenge);
    res.status(201).json(savedChallenge);
  } catch (error) {
    // Handle unique constraint errors
    if (error.code === 11000) {
      return res.status(409).json({ message: "Challenge ID must be unique" });
    }

    res.status(500).json({ message: "Error creating challenge", error });
  }
});

// API to Fetch All Challenges
app.get("/challenges", async (req, res) => {
  try {
    const challenges = await Challenge.find(); // Fetch all challenges
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching challenges", error });
  }
});

//API to get p2c challenge by id
app.get("/p2c/:id", async (req, res) => {
  try {
    // Check if the ID passed is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const challengeId = new ObjectId(req.params.id); // Convert to ObjectId if valid
    const challenge = await P2C.findById(challengeId); // Find challenge by ObjectId
    console.log(challenge);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    console.error("Error getting challenge:", error);
    res.status(500).json({ message: "Error getting challenge", error });
  }
});

// API to get challenge by id
app.get("/challenges/:id", async (req, res) => {
  try {
    // Check if the ID passed is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const challengeId = new ObjectId(req.params.id); // Convert to ObjectId if valid
    const challenge = await Challenge.findById(challengeId); // Find challenge by ObjectId
    console.log(challenge);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    console.error("Error getting challenge:", error);
    res.status(500).json({ message: "Error getting challenge", error });
  }
});

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
