require("dotenv").config({ path: `${__dirname}/../.env` });
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.use("/api/auth", routes.auth);
app.use("/api", routes.category);
app.use("/api/product", routes.product);
app.use("/api", routes.transaction);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));
app.use("/static", express.static("./src/Public"))

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});


//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
