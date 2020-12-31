import { Model, UniqueConstraintError, ValidationError } from "sequelize";
import AuthDBManager from "@src/models/AuthDBManager";
import Board from "@src/models/BoardModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData, AuthReqData } from "@src/vo/auth/services/reqData";

const logger = LogService.getInstance();

class BoardDao extends Dao {
    private constructor() {
        super();
        this.db = AuthDBManager.getInstance();
    }

    protected async connect() {
        this.db = await AuthDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async findOne({
        data,
        decoded,
        params
    }: AuthReqData): Promise<Board | string | null | undefined> {
        let result: Board | null = null;
        try {
            result = await Board.findOne({
                where: {
                    boardName: data.boardName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return result;
    }

    async findAll({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Board[] | string | null | undefined> {
        let result: Board[] | null = null;
        try {
            result = await Board.findAll();
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return result;
    }

    async save({
        data,
        decoded,
        params
    }: AuthReqData): Promise<Board | string | null | undefined> {
        let newBoard: Board | null = null;
        try {
            newBoard = await Board.create(data);
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newBoard;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<any | null | undefined> {
        let updateMember: any | null = null;
        try {
            updateMember = await Board.update(
                { boardName: data.boardName },
                { where: { idx: data.idx } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateMember;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteMember: number | null = null;
        try {
            deleteMember = await Board.destroy({
                where: {
                    boardName: data.boardName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteMember; //1 is success, 0 or undefined are fail
    }
}

export default BoardDao;
