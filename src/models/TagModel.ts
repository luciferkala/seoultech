import { Model, Sequelize } from "sequelize";
import { TagModelTypes } from "@src/vo/auth/models/TagModel";
import { TagTypes } from "@src/vo/auth/controllers/Tag";

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
    static initiate(connection: Sequelize): Model {
        const opt: TagModelTypes.IBaseTagTableOptions = {
            sequelize: connection,
            tableName: "Tag"
        };
        return Tag.init(TagModelTypes.attr, opt);
    }
}

export default Tag;
