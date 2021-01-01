import User from "@src/models/UserModel";
import EnvData from "@src/models/EnvDataModel";
import Board from "@src/models/BoardModel";
import Post from "@src/models/PostModel";
import Tag from "@src/models/TagModel";
import envData_tag from "@src/models/envData_tagModel";
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
        Tag.initiate(this.db.getConnection());
        EnvData.initiate(this.db.getConnection());
        Board.initiate(this.db.getConnection());
        Post.initiate(this.db.getConnection());
        envData_tag.initiate(this.db.getConnection());

        User.hasMany(EnvData, {
            sourceKey: "name",
            foreignKey: "author"
        });

        User.hasMany(Post, {
            sourceKey: "name",
            foreignKey: "author"
        });

        EnvData.belongsTo(User, {
            targetKey: "name",
            foreignKey: "author"
        });

        Post.belongsTo(User, {
            targetKey: "name",
            foreignKey: "author"
        });

        Tag.belongsToMany(EnvData, {
            through: "envData_tag",
            foreignKey: "tag_idx"
        });

        EnvData.belongsToMany(Tag, {
            through: "envData_tag",
            foreignKey: "env_idx",
            as: "tags"
        });
    }

    public async sync(): Promise<void> {
        await User.sync();
        await EnvData.sync();
        await Board.sync();
        await Post.sync();
        await Tag.sync();
        await envData_tag.sync();

        // await this.endConnect();
    }
}

export default InitializerDao;
