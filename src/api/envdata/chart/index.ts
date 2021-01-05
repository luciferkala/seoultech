import { Router } from "express";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllByDataController from "@src/controllers/services/envdata/FindAllByDataController";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindAllByDataController().excute()
);

export default router;
