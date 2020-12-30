import { Router } from "express";
import userRouter from "@src/api/user";
import envDataRouter from "@src/api/envdata";

const router = Router();

router.use("/user", userRouter);
router.use("/envdata", envDataRouter);

export default router;
