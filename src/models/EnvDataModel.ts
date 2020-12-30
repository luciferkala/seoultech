import { Model, Sequelize, Optional } from "sequelize";
import { EnvDataModelTypes } from "@src/vo/auth/models/EnvDataModel";
import { EnvDataTypes } from "@src/vo/auth/controllers/EnvData";

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
    public humid?: number;
    public dust?: number;
    public atm?: number;
    public author!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: EnvDataModelTypes.IBaseEnvDataTableOptions = {
            sequelize: connection,
            tableName: "EnvData"
        };
        return EnvData.init(EnvDataModelTypes.attr, opt);
    }
}

export default EnvData;
