const { configDotenv } = require("dotenv");
configDotenv({
  path: "./config.env",
});
const app = require("./app.js");
const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port number on ${port}`);
});
