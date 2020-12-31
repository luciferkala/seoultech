import LogService from "@src/utils/LogService";
import TagDao from "@src/dao/TagDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import Tag from "@src/models/TagModel";
const logger = LogService.getInstance();
class UserService {
    static findOne = serviceFactory.get<Tag>(TagDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Tag>(TagDao.getInstance().findAll);
    static create = serviceFactory.postOrUpdate<Tag>(TagDao.getInstance().save);
    static update = serviceFactory.postOrUpdate<Tag>(
        TagDao.getInstance().update
    );
    static delete = serviceFactory.delete<Tag>(TagDao.getInstance().delete);
}

export default UserService;
