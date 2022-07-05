import { Router } from "express";
import {
  getFinantialEvent,
  getSumFinantialEvent,
  postFinantialEvent,
} from "../controllers/finantialEventsController.js";

const finantialEventsRouter = Router();

finantialEventsRouter.post("/financial-events", postFinantialEvent);
finantialEventsRouter.get("/financial-events", getFinantialEvent);
finantialEventsRouter.get("/financial-events/sum", getSumFinantialEvent);

export default finantialEventsRouter;
