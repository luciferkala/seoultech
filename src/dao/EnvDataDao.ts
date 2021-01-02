import { UniqueConstraintError, ValidationError } from "sequelize";
import AuthDBManager from "@src/models/AuthDBManager";
import EnvData from "@src/models/EnvDataModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import {
    AllStrictReqData,
    AuthReqData,
    ReqData
} from "@src/vo/auth/services/reqData";
import Tag from "@src/models/TagModel";
import User from "@src/models/UserModel";
import envData_tag from "@src/models/envData_tagModel";

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
                include: "tags"
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
                include: "tags"
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
        params,
        file
    }: ReqData): Promise<EnvData | string | null | undefined> {
        const transaction = await AuthDBManager.getInstance().getTransaction();
        let newEnvData: EnvData | null = null;
        let getUser: User | null = null;
        let getTag: Tag[] | null = [];
        let tags: string[] = JSON.parse(data?.tags);
        console.log(tags);
        try {
            getUser = await User.findOne({
                where: { email: decoded?.email },
                transaction
            });
            for (let tag of tags) {
                let t = await Tag.findOne({
                    where: { value: tag },
                    transaction
                });
                if (t != null) {
                    getTag.push(t);
                }
            }
            console.log(JSON.stringify(getTag));
            newEnvData = await EnvData.create({
                location: data?.location,
                time: data?.time,
                picture: file?.location,
                description: data?.description,
                temp: data?.temp,
                humid: data?.humid,
                dust: data?.dust,
                atm: data?.atm,
                author: getUser?.getDataValue("name"),
                transaction
            });
            await newEnvData.addTags(getTag, {
                through: { selfGranted: false }
            });
            // newEnvData.
            await transaction.commit();
        } catch (err) {
            logger.error(err);
            await transaction.rollback();
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newEnvData;
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
