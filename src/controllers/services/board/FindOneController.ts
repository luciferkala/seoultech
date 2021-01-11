import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import BoardService from "@src/services/BoardService";

import resTypes from "@src/utils/resTypes";
import Board from "@src/models/BoardModel";

class FindOneController extends Controller {
    private result: Board | string;
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
            this.result = await BoardService.findOne(req);
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
                resTypes.cannotFindItemRes(res, "게시판");
                break;
            default:
                resTypes.successRes(res, "특정 게시판 조회", this.result);
        }
    }
}

export default FindOneController;
