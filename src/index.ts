import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { apiRouter } from "./routers/api";

dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
