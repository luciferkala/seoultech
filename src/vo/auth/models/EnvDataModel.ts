import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace EnvDataModelTypes {
    export interface IBaseEnvDataTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IEnvDataScheme extends ModelAttributes {
        location: IColumnOption;
        time: IColumnOption;
        picture: IColumnOption;
        description: IColumnOption;
        temp: IColumnOption;
        humid: IColumnOption;
        dust: IColumnOption;
        atm: IColumnOption;
        author: IColumnOption;
    }
    export const attr: EnvDataModelTypes.IEnvDataScheme = {
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isUrl: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        temp: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        humid: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        dust: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        atm: {
            type: DataTypes.FLOAT,
            allowNull: true,
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
