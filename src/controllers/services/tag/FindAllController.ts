import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import TagService from "@src/services/TagService";

import resTypes from "@src/utils/resTypes";
import Tag from "@src/models/TagModel";

class FindAllController extends Controller {
    private result: Tag[] | string;
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
            this.result = await TagService.findAll(req);
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
                resTypes.cannotFindItemRes(res, "태그");
                break;
            default:
                resTypes.successRes(res, "태그 일괄 조회", this.result);
        }
    }
}

export default FindAllController;
