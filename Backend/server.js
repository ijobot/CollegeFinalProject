// Import instance of Express and CORS helper library
const express = require("express");
const cors = require("cors");

// Import defined routers
const homeRouter = require("./Routers/home");
const combatantRouter = require("./Routers/combatants");

// Initialize server instance
const app = express();

// Define port
const PORT = 5000;

// Apply CORS library
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

app.use("/", homeRouter);
app.use("/combatants", combatantRouter);
