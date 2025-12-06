const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const data = await sql.query("select * from Combatants");
    if (data) {
      console.log(data);
      res.send(data.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", (req, res) => {
  const { body } = req;
  const newcombatant = { ...body };
  const addToParty = sql.query(
    `insert into Combatants values ('${newcombatant.name}', '${newcombatant.type}', ${newcombatant.score})`
  );
  if (addToParty) {
    console.log("Party member added!");
    res.send(`Party member ${newcombatant.name} added`);
  }

  console.log(req.body);
  res.send(newcombatant);
});

module.exports = router;
