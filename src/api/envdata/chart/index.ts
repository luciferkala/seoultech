import { Router } from "express";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllByDataController from "@src/controllers/services/envdata/FindAllByDataController";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindAllByDataController().excute()
);

// router.post(
//     "/humid",
//     new JwtVerifyAccessController().excute(),
//     new FindAllController().excute()
// );

// router.post(
//     "/dust",
//     new JwtVerifyAccessController().excute(),
//     new FindAllController().excute()
// );

// router.post(
//     "/atm",
//     new JwtVerifyAccessController().excute(),
//     new FindAllController().excute()
// );

export default router;
