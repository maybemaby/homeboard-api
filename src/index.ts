import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import { apiRouter } from "./routers/api";
import { authRouter } from "./routers/auth";
import { authLogger } from "./middleware/logging";

dotenv.config();
const PORT = process.env.PORT ?? 3000;
export const JWT_SECRET = process.env.JWT_SECRET_KEY ?? "12312nfklas";

import "./middleware/auth";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(
  helmet({
    hidePoweredBy: false,
  })
);
app.use(passport.initialize());

app.use("/api", apiRouter);
app.use("/auth", authLogger, authRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
