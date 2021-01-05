import {
    Model,
    Sequelize,
    Optional,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    Association
} from "sequelize";
import { EnvDataModelTypes } from "@src/vo/auth/models/EnvDataModel";
import { EnvDataTypes } from "@src/vo/auth/controllers/EnvData";
import Tag from "./TagModel";

// interface UserCreationAttributes
//     extends Optional<SignUpTypes.SignUpBody, "email"> {}
class EnvData
    // extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    extends Model
    implements EnvDataTypes.Body {
    public idx!: number;
    public location!: string;
    public time!: Date;
    public picture?: string;
    public description?: string;
    public temp!: number;
    public humid!: number;
    public dust!: number;
    public atm!: number;
    public author!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public createTag!: BelongsToManyCreateAssociationMixin<Tag>;
    public getTags!: BelongsToManyGetAssociationsMixin<Tag>;
    public addTags!: BelongsToManyAddAssociationsMixin<Tag, number>;
    public hasTags!: BelongsToManyHasAssociationsMixin<Tag, number>;
    public removeTags!: BelongsToManyRemoveAssociationsMixin<Tag, number>;

    public readonly tags?: Tag[];

    public static associations: {
        tags: Association<EnvData, Tag>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: EnvDataModelTypes.IBaseEnvDataTableOptions = {
            sequelize: connection,
            tableName: "EnvData"
        };
        return EnvData.init(EnvDataModelTypes.attr, opt);
    }
}

export default EnvData;
