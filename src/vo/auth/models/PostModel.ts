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
    export interface IForeignReferences {
        model: string;
        key: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        autoIncrement?: boolean;
        validate?: ModelValidateOptions;
        onDelete?: string;
        onUpdate?: string;
        references?: IForeignReferences;
    }
    export interface IBoardScheme extends ModelAttributes {
        idx: IColumnOption;
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        boardName: IColumnOption;
    }
    export const attr: PostModelTypes.IBoardScheme = {
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        },
        boardName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
