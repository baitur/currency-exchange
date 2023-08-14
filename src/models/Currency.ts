import { Sequelize, Model, DataTypes } from 'sequelize';

export class Currency extends Model {
    public id!: number;
    public name!: string;
    public rate!: number;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initializeCurrencyModel(sequelize: Sequelize) {
    Currency.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        rate: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false,
        },
    }, {
        tableName: 'currencies',
        sequelize: sequelize,
    });
}

