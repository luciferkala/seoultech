import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import TagService from "@src/services/TagService";

import resTypes from "@src/utils/resTypes";
import Tag from "@src/models/TagModel";

class FindOneController extends Controller {
    private result: Tag | string;
    constructor() {
        super();
        this.result = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            this.result = await TagService.findOne(req);
        } catch (e: unknown) {
            this.result = "InternalServerError";
            console.log(e);
        }
    }

    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "CannotFindItem":
                resTypes.cannotFindItemRes(res, "user");
                break;
            default:
                resTypes.successRes(res, "특정 태그 조회", this.result);
        }
    }
}

export default FindOneController;
