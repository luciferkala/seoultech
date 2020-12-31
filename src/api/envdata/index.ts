import { Router } from "express";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import CreateController from "@src/controllers/services/envdata/CreateController";
import FindAllController from "@src/controllers/services/envdata/FindAllController";
import FindOneController from "@src/controllers/services/envdata/FindOneController";
import upload from "@src/utils/upload";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    upload.single("photo"),
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
