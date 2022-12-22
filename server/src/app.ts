import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (_req, res) => {
	res.send("nice");
});

export default app;
