import LogService from "@src/utils/LogService";
import BoardDao from "@src/dao/BoardDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import Board from "@src/models/BoardModel";
const logger = LogService.getInstance();
class UserService {
    static findOne = serviceFactory.get<Board>(BoardDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Board>(
        BoardDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Board>(
        BoardDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Board>(
        BoardDao.getInstance().update
    );
    static delete = serviceFactory.delete<Board>(BoardDao.getInstance().delete);
}

export default UserService;
