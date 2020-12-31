import LogService from "@src/utils/LogService";
import EnvDataDao from "@src/dao/EnvDataDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import EnvData from "@src/models/EnvDataModel";
const logger = LogService.getInstance();
class UserService {
    static findOne = serviceFactory.get<EnvData>(
        EnvDataDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<EnvData>(
        EnvDataDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<EnvData>(
        EnvDataDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<EnvData>(
        EnvDataDao.getInstance().update
    );
    static delete = serviceFactory.delete<EnvData>(
        EnvDataDao.getInstance().delete
    );
}

export default UserService;
