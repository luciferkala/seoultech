import { Router } from "express";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import CreateController from "@src/controllers/services/envdata/CreateEnvDataController";
import FindAllController from "@src/controllers/services/envdata/FindAllEnvDataController";
import FindOneController from "@src/controllers/services/envdata/FindOneEnvDataController";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

router.get(
    "/all",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);
router.get(
    "/one",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);

export default router;
