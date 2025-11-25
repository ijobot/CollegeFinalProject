const express = require("express");
const cors = require("cors");
const homeRouter = require("./Routers/home");
const combatantRouter = require("./Routers/combatants");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.listen(5000, () => {
  console.log("The server has started!");
});

app.use("/", homeRouter);
app.use("/combatants", combatantRouter);
