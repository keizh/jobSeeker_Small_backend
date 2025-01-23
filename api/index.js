require("dotenv").config();
const express = require(`express`);
const mongoose = require(`express`);
const cors = require(`cors`);
const { dbConnect } = require("../db/dbConnect");
const { JobRouter } = require("../routes/JobRoute/JobRouter");
dbConnect();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["PUT", "GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/api/v1/job", JobRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to InterHouse Backend", endPoint: "/" });
});

app.listen(process.env.PORT, () => console.log(`Web Server is Online`));
