const express = require("express");
const routes = require("./routes");

const app = express();
const port = 8001;

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
