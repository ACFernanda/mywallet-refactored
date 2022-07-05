import cors from "cors";
import express from "express";

import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use((error, req, res, next) => {
  return res.sendStatus(500);
});

export default app;
