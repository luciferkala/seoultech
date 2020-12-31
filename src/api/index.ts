import { Router } from "express";
import userRouter from "@src/api/user";
import envDataRouter from "@src/api/envdata";
import boardRouter from "@src/api/board";
import postRouter from "@src/api/post";

const router = Router();

router.use("/user", userRouter);
router.use("/envdata", envDataRouter);
router.use("/board", boardRouter);
router.use("/post", postRouter);

export default router;
