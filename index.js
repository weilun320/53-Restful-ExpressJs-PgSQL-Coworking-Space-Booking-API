require("dotenv").config();
let express = require("express");
let path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
const { VITE_DATABASE_URL } = process.env;

let app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: VITE_DATABASE_URL,
  ssl: {
    require: true,
  },
});

async function getPostgresVersion() {
  const client = await pool.connect();

  try {
    const res = await client.query("SELECT version()");
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
};

getPostgresVersion();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Coworking space Booking API!" });
});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});