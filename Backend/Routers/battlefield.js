const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

router.post("/saveParty", async (req, res) => {
  const { combatants, currentUser } = req.body;
  try {
    const data = await sql.query(
      `SELECT * FROM ${currentUser.username}_SavedParty;`
    );
    if (data.recordset.length) {
      await sql.query(`DROP TABLE ${currentUser.username}_SavedParty;`);
      await sql.query(
        `CREATE TABLE ${currentUser.username}_SavedParty (id int IDENTITY(1,1) PRIMARY KEY, name varchar(50), type varchar(50), score int, statBlockUrl varchar(100));`
      );
      await combatants.forEach((combatantToAdd) => {
        const addToParty = sql.query(
          `INSERT INTO ${currentUser.username}_SavedParty VALUES ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score}, '${combatantToAdd.statBlockUrl}');`
        );
        if (addToParty) {
          console.log(`${combatantToAdd.name} added to saved party!`);
        }
      });
      res.json(
        `{ message: ${combatants.length} party members added to database.}`
      );
    } else {
      await combatants.forEach((combatantToAdd) => {
        const addToParty = sql.query(
          `INSERT INTO ${currentUser.username}_SavedParty VALUES ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score}, '${combatantToAdd.statBlockUrl}');`
        );
        if (addToParty) {
          console.log(`${combatantToAdd.name} added to saved party!`);
        }
      });
      res.json(
        `{ message: ${combatants.length} party members added to database.}`
      );
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username.substring(1);
  try {
    const data = await sql.query(`SELECT * FROM ${username}_SavedParty;`);
    if (data) {
      console.log(data);
      res.send(data.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
