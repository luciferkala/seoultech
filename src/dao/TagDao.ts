import { Model, UniqueConstraintError, ValidationError } from "sequelize";
import AuthDBManager from "@src/models/AuthDBManager";
import Tag from "@src/models/TagModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData, AuthReqData } from "@src/vo/auth/services/reqData";

const logger = LogService.getInstance();

class TagDao extends Dao {
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
    }: AuthReqData): Promise<Tag | string | null | undefined> {
        let result: Tag | null = null;
        try {
            result = await Tag.findOne({
                where: {
                    idx: data.idx
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
    }: AllStrictReqData): Promise<Tag[] | string | null | undefined> {
        let result: Tag[] | null = null;
        try {
            result = await Tag.findAll({
                where: {}
                //다대다로 묶여서 글에 묶여있는 태그 보여주기
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
    }: AuthReqData): Promise<Tag | string | null | undefined> {
        let newBoard: Tag | null = null;
        try {
            newBoard = await Tag.create(data);
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
            updateMember = await Tag.update(
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
            deleteMember = await Tag.destroy({
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

export default TagDao;
