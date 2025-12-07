const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

router.get("/loadParty", async (req, res) => {
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

router.post("/saveParty", async (req, res) => {
  const combatants = req.body;
  console.log(combatants);
  try {
    await combatants.forEach((combatantToAdd) => {
      const addToParty = sql.query(
        `insert into Combatants values ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score})`
      );
      if (addToParty) {
        console.log(`Party member ${combatantToAdd.name} added!`);
      }
    });
    res.send(`${combatants.length} party members added to database.`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
