import { UniqueConstraintError, ValidationError, Op } from "sequelize";
import moment from "moment";
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
                include: {
                    model: Tag,
                    as: "tags"
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
    }: AllStrictReqData): Promise<EnvData[] | string | null | undefined> {
        let result: EnvData[] | null = null;
        try {
            result = await EnvData.findAll({
                where: {
                    location: data.location,
                    time: {
                        [Op.and]: {
                            [Op.gte]: moment(
                                data?.date + " " + data?.time,
                                "YYYY-MM-DD hh"
                            ).toDate(),
                            [Op.lte]: moment(
                                data?.date + " " + data?.time + ":59",
                                "YYYY-MM-DD hh:mm"
                            ).toDate()
                        }
                    }
                },
                include: {
                    model: Tag,
                    as: "tags"
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return result;
    }

    async findAllByData({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<EnvData[] | string | null | undefined> {
        let result: EnvData[] | null = null;
        //온도, 습도, 미세먼지농도, 기압
        let criteria: string = "";
        switch (data.criteria) {
            case "0":
                criteria = "temp";
                break;
            case "1":
                criteria = "humid";
                break;
            case "2":
                criteria = "dust";
                break;
            case "3":
                criteria = "atm";
                break;
            default:
                criteria = "temp";
        }
        try {
            result = await EnvData.findAll({
                attributes: ["time", criteria],
                where: {
                    location: data.location || "서울과학기술대학교 미래관"
                    // time: {
                    //     [Op.and]: {
                    //         [Op.gte]: moment(
                    //             data?.date + " " + data?.time,
                    //             "YYYY-MM-DD hh"
                    //         ).toDate(),
                    //         [Op.lte]: moment(
                    //             data?.date + " " + data?.time + ":59",
                    //             "YYYY-MM-DD hh:mm"
                    //         ).toDate()
                    //     }
                    // }
                },
                include: {
                    model: Tag,
                    as: "tags"
                }
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
            console.log(moment(data?.time, "hh:mm"));
            newEnvData = await EnvData.create({
                location: data?.location,
                time: moment(data?.date + " " + data?.time, "YYYY-MM-DD hh:mm"),
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
