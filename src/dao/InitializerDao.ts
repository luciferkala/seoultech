import User from "@src/models/UserModel";
import EnvData from "@src/models/EnvDataModel";
import Board from "@src/models/BoardModel";
import Post from "@src/models/PostModel";
import AuthDBManager from "@src/models/AuthDBManager";
import Dao from "@src/dao/Dao";
import { toNamespacedPath } from "path";

class InitializerDao extends Dao {
    protected db: AuthDBManager;
    protected constructor() {
        super();
        this.db = AuthDBManager.getInstance();
        const firstInit = async () => await this.init();
        const firstSync = async () => await this.sync();
        firstInit();
        firstSync();
    }

    protected async connect() {
        this.db = AuthDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    public async init(): Promise<void> {
        User.initiate(this.db.getConnection());
        EnvData.initiate(this.db.getConnection());
        Board.initiate(this.db.getConnection());
        Post.initiate(this.db.getConnection());

        User.hasMany(EnvData, {
            sourceKey: "email",
            foreignKey: "author"
        });

        User.hasMany(Post, {
            sourceKey: "email",
            foreignKey: "author"
        });

        EnvData.belongsTo(User, {
            targetKey: "email",
            foreignKey: "author"
        });

        Post.belongsTo(User, {
            targetKey: "email",
            foreignKey: "author"
        });
    }

    public async sync(): Promise<void> {
        await User.sync();
        await EnvData.sync();
        await Board.sync();
        await Post.sync();
        // await this.endConnect();
    }
}

export default InitializerDao;
