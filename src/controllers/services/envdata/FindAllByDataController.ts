import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import EnvDataService from "@src/services/EnvDataService";

import resTypes from "@src/utils/resTypes";
import EnvData from "@src/models/EnvDataModel";

class FindAllController extends Controller {
    private result: EnvData[] | string;
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
            this.result = await EnvDataService.findAllByData(req);
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
                resTypes.cannotFindItemRes(res, "차트 환경데이터");
                break;
            default:
                resTypes.successRes(res, "차트 기준별 조회", this.result);
        }
    }
}

export default FindAllController;
