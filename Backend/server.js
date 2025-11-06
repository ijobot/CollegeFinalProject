const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const config = require("./config");

const app = express();

const combatantRouter = require("./Routers/combatants");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/combatants", combatantRouter);

app.get("/", async (req, res) => {
  res.send({ data: "Hey Joe, the / page is working." });
});

app.listen(5000, () => {
  console.log("The server has started!");
});
