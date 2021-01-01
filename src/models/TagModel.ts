import {
    Association,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyRemoveAssociationsMixin,
    Model,
    Sequelize
} from "sequelize";
import { TagModelTypes } from "@src/vo/auth/models/TagModel";
import { TagTypes } from "@src/vo/auth/controllers/Tag";
import EnvData from "./EnvDataModel";

// interface UserCreationAttributes
//     extends Optional<SignUpTypes.SignUpBody, "email"> {}
class Tag
    // extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    extends Model
    implements TagTypes.Body {
    public idx!: number;
    public value!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public createEnv!: BelongsToManyCreateAssociationMixin<EnvData>;
    public getEnvss!: BelongsToManyGetAssociationsMixin<EnvData>;
    public addEnvss!: BelongsToManyAddAssociationsMixin<EnvData, number>;
    public hasEnvss!: BelongsToManyHasAssociationsMixin<EnvData, number>;
    public removeEnvs!: BelongsToManyRemoveAssociationsMixin<EnvData, number>;

    public readonly tags?: Tag[];

    public static associations: {
        tags2: Association<Tag, EnvData>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: TagModelTypes.IBaseTagTableOptions = {
            sequelize: connection,
            tableName: "Tag"
        };
        return Tag.init(TagModelTypes.attr, opt);
    }
}

export default Tag;
