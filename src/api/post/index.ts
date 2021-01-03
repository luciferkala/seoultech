import { Router } from "express";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import CreateController from "@src/controllers/services/post/CreateController";
import FindAllController from "@src/controllers/services/post/FindAllController";
import FindOneController from "@src/controllers/services/post/FindOneController";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

router.post(
    "/all",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);
router.post(
    "/one",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);

export default router;
