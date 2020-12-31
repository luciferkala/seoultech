import LogService from "@src/utils/LogService";
import PostDao from "@src/dao/PostDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import Post from "@src/models/PostModel";
const logger = LogService.getInstance();
class UserService {
    static findOne = serviceFactory.get<Post>(PostDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Post>(
        PostDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Post>(
        PostDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Post>(
        PostDao.getInstance().update
    );
    static delete = serviceFactory.delete<Post>(PostDao.getInstance().delete);
}

export default UserService;
