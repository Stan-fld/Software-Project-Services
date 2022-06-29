import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";

const config = {
    tableName: 'Roles',
    timestamps: true,
    sequelize: sequelize,
};

class Role extends Model {
    id!: string;
    name!: string;
    desc!: string;
}

Role.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, config);

export default Role;
