import { Model, UniqueConstraintError, ValidationError } from "sequelize";
import AuthDBManager from "@src/models/AuthDBManager";
import Post from "@src/models/PostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData, AuthReqData } from "@src/vo/auth/services/reqData";
import User from "@src/models/UserModel";

const logger = LogService.getInstance();

class PostDao extends Dao {
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
    }: AuthReqData): Promise<Post | string | null | undefined> {
        let result: Post | null = null;
        try {
            result = await Post.findOne({
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
    }: AllStrictReqData): Promise<Post[] | string | null | undefined> {
        let result: Post[] | null = null;
        try {
            result = await Post.findAll({
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

    async save({
        data,
        decoded,
        params
    }: AuthReqData): Promise<Post | string | null | undefined> {
        const transaction = await AuthDBManager.getInstance().getTransaction();
        let newBoard: Post | null = null;
        let getUser: User | null = null;
        try {
            getUser = await User.findOne({
                where: { email: decoded?.email },
                transaction
            });
            newBoard = await Post.create({
                title: data.title,
                content: data.content,
                boardName: data.boardName,
                author: getUser?.getDataValue("name"),
                transaction
            });
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
            updateMember = await Post.update(
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
            deleteMember = await Post.destroy({
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

export default PostDao;
