import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace PostModelTypes {
    export interface IBasePostTableOptions extends InitOptions {
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
        idx: IColumnOption;
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
    }
    export const attr: PostModelTypes.IBoardScheme = {
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
