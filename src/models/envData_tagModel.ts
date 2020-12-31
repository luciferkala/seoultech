import { Model, Sequelize, Optional } from "sequelize";
import { envData_tagModelTypes } from "@src/vo/auth/models/envData_tagModel";
import { envData_tagTypes } from "@src/vo/auth/controllers/envData_tag";

// interface UserCreationAttributes
//     extends Optional<SignUpTypes.SignUpBody, "email"> {}
class envData_tag
    // extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    extends Model
    implements envData_tagTypes.Body {
    public env_idx!: number;
    public tag_idx!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: envData_tagModelTypes.IBaseenvData_tagTableOptions = {
            sequelize: connection,
            tableName: "envData_tag"
        };
        return envData_tag.init(envData_tagModelTypes.attr, opt);
    }
}

export default envData_tag;
