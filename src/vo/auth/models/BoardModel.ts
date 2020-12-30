import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace BoardModelTypes {
    export interface IBaseBoardTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IBoardScheme extends ModelAttributes {
        boardName: IColumnOption;
    }
    export const attr: BoardModelTypes.IBoardScheme = {
        boardName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        }
    };
}
