import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import EnvDataService from "@src/services/EnvDataService";

import resTypes from "@src/utils/resTypes";
import EnvData from "@src/models/EnvDataModel";

class FindOneController extends Controller {
    private result: EnvData | string;
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
            this.result = await EnvDataService.findOne(req);
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
                resTypes.cannotFindItemRes(res, "환경데이터");
                break;
            default:
                resTypes.successRes(res, "특정 환경데이터 조회", this.result);
        }
    }
}

export default FindOneController;
