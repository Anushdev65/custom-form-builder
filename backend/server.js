import express, { json } from "express";
import { config } from "dotenv";
import { port, apiVersion } from "./config/config.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import db from "./models/index.js";
import apiRouter from "./routes/index.js";
import cors from "cors";

config();

const expressApp = express();

expressApp.use(cors());
expressApp.use(json());

expressApp.use(morgan("dev"));

expressApp.use(bodyParser.json());

(async () => {
  await db.syncDatabase();
})();

expressApp.use(`${apiVersion}`, apiRouter);

expressApp.get("/", (req, res) => {
  res.send("Hello World");
});

expressApp.listen(port, () => {
  console.log(`The server is listening at port ${port}`);
});
