import { Model, UniqueConstraintError, ValidationError } from "sequelize";
import AuthDBManager from "@src/models/AuthDBManager";
import EnvData from "@src/models/EnvDataModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData, AuthReqData } from "@src/vo/auth/services/reqData";
import Tag from "@src/models/TagModel";

const logger = LogService.getInstance();

class EnvDataDao extends Dao {
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
    }: AuthReqData): Promise<EnvData | string | null | undefined> {
        let result: EnvData | null = null;
        try {
            result = await EnvData.findOne({
                where: {
                    idx: data.idx
                },
                include: Tag
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
    }: AllStrictReqData): Promise<EnvData[] | string | null | undefined> {
        let result: EnvData[] | null = null;
        try {
            result = await EnvData.findAll({
                where: {
                    location: data.location,
                    time: data.time
                },
                include: Tag
            });
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
    }: AuthReqData): Promise<EnvData | string | null | undefined> {
        let newBoard: EnvData | null = null;
        try {
            newBoard = await EnvData.create(data);
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
            updateMember = await EnvData.update(
                { ...data },
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
            deleteMember = await EnvData.destroy({
                where: {
                    idx: data.idx
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

export default EnvDataDao;
