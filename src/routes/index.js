import { Router } from "express";

import authRouter from "./authRouter.js";
import finantialEventsRouter from "./finantialEventsRouter.js";

const router = Router();

router.use(authRouter);
router.use(finantialEventsRouter);

export default router;
