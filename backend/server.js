const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8001;

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
