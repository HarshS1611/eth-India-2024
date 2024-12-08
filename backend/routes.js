const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const {
  createChallenge,
  createBucket,
  getAllBuckets,
  getFilesByBucketName,
  downloadFile,
} = require("./apiServices");

// Create Challenge Route
router.post("/addchallenge", async (req, res) => {
  try {
    const result = await createChallenge(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Bucket Route
router.post("/buckets", async (req, res) => {
  try {
    const { bucketName } = req.body;
    if (!bucketName) {
      return res.status(400).json({ error: "bucketName is required" });
    }
    const result = await createBucket(bucketName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Buckets Route
router.get("/buckets", async (req, res) => {
  try {
    const result = await getAllBuckets();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all files from bucket
router.get("/buckets/:bucketName", async (req, res) => {
  try {
    const { bucketName } = req.params;
    if (!bucketName) {
      return res.status(400).json({ error: "bucketName is required" });
    }
    const result = await getFilesByBucketName(bucketName);
    console.log(result);
    res.json(result);
    //loop through the result.data, and get the file name
    //get the file name and download
    result.data.forEach(async (file) => {
      const fileName = file.Name;
      console.log("Downloading file", fileName);
      await downloadFile(bucketName, fileName, "downloads");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//have a route to go through all the files in the downloads folder and store all the data in a single json
router.get("/getallchallenges", async (req, res) => {
  try {
    const dir = "./downloads";
    const files = fs.readdirSync(dir);
    let allData = [];
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const data = fs.readFileSync(filePath);
      allData.push(JSON.parse(data));
    });
    console.log(allData);
    // fs.writeFileSync("allData.json", JSON.stringify(allData));
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a route to get details of a single file by its id
router.get("/challenge/:id", async (req, res) => {
  try {
    const dir = "./downloads";
    const files = fs.readdirSync(dir);
    let fileData = {};
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const data = fs.readFileSync(filePath);
      const jsonData = JSON.parse(data);
      console.log(jsonData.id, req.params.id);
      if (jsonData.id === req.params.id) {
        fileData = jsonData;
      }
    });
    console.log(fileData);
    res.json(fileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
