import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";
import Role from "./role.model";
import Service from "./service.model";

const config = {
    tableName: 'Transactions',
    timestamps: true,
    sequelize: sequelize
};

class Transaction extends Model {
    id!: string;
    code!: string;
    reqCat!: string;
    desc!: string;
    roleId!: string;
    role: Role;
    serviceId!: string;
    service: Service;
}

Transaction.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reqCat: {
        type: DataTypes.ENUM('GET', 'PUT', 'PATCH', 'POST', 'DELETE'),
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, config);

Role.hasMany(Transaction, {as: 'transactions'});
Transaction.belongsTo(Role, {foreignKey: 'roleId', as: 'role'});

Service.hasMany(Transaction, {as: 'transactions'});
Transaction.belongsTo(Service, {foreignKey: 'serviceId', as: 'service'});

export default Transaction;
