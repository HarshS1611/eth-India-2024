const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const API_BASE_URL = "https://6ad1-14-195-142-82.ngrok-free.app";

async function apiRequest(method, endpoint, data = null) {
  console.log("apiRequest", method, endpoint, data);
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw error;
  }
}

async function createBucket(bucketName) {
  return await apiRequest("POST", "/buckets", { bucketName });
}

async function getAllBuckets() {
  return await apiRequest("GET", "/buckets");
}

async function getFilesByBucketName(bucketName) {
  return await apiRequest("GET", `/buckets/${bucketName}/files`);
}

async function uploadFile(bucketName, filePath) {
  console.log("uploading file to bucketName", bucketName, "filePath", filePath);
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  try {
    const response = await axios.post(
      `${API_BASE_URL}/buckets/${bucketName}/files`,
      form,
      {
        headers: form.getHeaders(),
      }
    );
    console.log("response is", response.data);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw error;
  }
}

async function downloadFile(bucketName, fileName, outputDir) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/buckets/${bucketName}/files/${fileName}/download`,
      {
        responseType: "blob",
      }
    );
    console.log(`File downloaded: ${fileName}`);
    fs.writeFileSync(`./${outputDir}/${fileName}`, response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

async function createChallenge(challengeData) {
  try {
    // Create the file with challenge ID as name
    const filePath = `${challengeData.id}.json`;

    // Write the challenge data to file
    fs.writeFileSync(filePath, JSON.stringify(challengeData, null, 2));
    try {
      // Upload the file
      console.log("uploading file to", filePath);
      const result = await uploadFile("newbucket", filePath);
      console.log("result is", result);
      // Delete the file after upload
      fs.unlinkSync(filePath);
      console.log("result after unlink filepath is", result);
      return result;
    } catch (error) {
      // Clean up file if upload fails
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in createChallenge:", error);
    throw error;
  }
}

module.exports = {
  apiRequest,
  uploadFile,
  createChallenge,
  createBucket,
  getAllBuckets,
  getFilesByBucketName,
  downloadFile,
};
