import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace envData_tagModelTypes {
    export interface IBaseenvData_tagTableOptions extends InitOptions {
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
        validate?: ModelValidateOptions;
        onDelete?: string;
        onUpdate?: string;
        references?: IForeignReferences;
    }
    export interface IenvData_tagScheme extends ModelAttributes {
        env_idx: IColumnOption;
        tag_idx: IColumnOption;
    }
    export const attr: envData_tagModelTypes.IenvData_tagScheme = {
        env_idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: "EnvData",
                key: "idx"
            }
        },
        tag_idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: "Tag",
                key: "idx"
            }
        }
    };
}
