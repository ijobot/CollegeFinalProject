const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");
const logger = require("../logger");

router.use(logger);

// router.get("/", async (req, res) => {
//   try {
//     const connection = await sql.connect(config);
//     if (connection) {
//       console.log("database successfully connected");
//       res.send({ message: "Hey Joe, the Home Router is working." });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
