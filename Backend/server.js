const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());

const config = {
  user: "sa",
  password: "TEST1234",
  server: "JOESLAPTOP/BATTLEPLAN",
  database: "Combatants",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "BATTLEPLAN",
    stringifyObjects: true,
  },
  port: 5555,
};

app.get("/Combatants", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    if (pool) {
      console.log("database successfully connected");
    }
    const data = pool.request().query("select * from Combatants");
    if (data) {
      data.then(() => console.log(data));
    }

    return JSON.stringify(data);
    // return JSON.stringify(res);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  return res.json("Hello from the backend!");
});

app.listen(5000, () => {
  console.log("The server has started!");
});
