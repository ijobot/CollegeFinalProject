// Import instance of Express and CORS helper library
const express = require("express");
const cors = require("cors");

// Import defined routers
const loginRouter = require("./Routers/login");
const homeRouter = require("./Routers/home");
const battlefieldRouter = require("./Routers/battlefield");

// Initialize server instance
const app = express();

// Define port
const PORT = 5000;

// Apply CORS library (this would be much more secure in commercial development,
// but for now, the asterisk allows any and all source origins)
app.use(
  cors({
    origin: "*",
  })
);

// Tell Express to consider all responses as JSON and format them accordingly
app.use(express.json());

// Listen to server on specified port
app.listen(PORT, () => {
  console.log("The server has started!");
});

// Informing server of which routers to use for certain paths
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/battlefield", battlefieldRouter);
