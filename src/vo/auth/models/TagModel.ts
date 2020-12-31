import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace TagModelTypes {
    export interface IBaseTagTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        autoIncrement?: boolean;
        validate?: ModelValidateOptions;
    }
    export interface ITagScheme extends ModelAttributes {
        idx: IColumnOption;
        value: IColumnOption;
    }
    export const attr: TagModelTypes.ITagScheme = {
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
