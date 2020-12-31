import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import BoardService from "@src/services/BoardService";

import resTypes from "@src/utils/resTypes";
import Board from "@src/models/BoardModel";

class FindAllController extends Controller {
    private result: Board[] | string;
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
            this.result = await BoardService.findAll(req);
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
                resTypes.successRes(res, "게시판 일괄 조회", this.result);
        }
    }
}

export default FindAllController;
