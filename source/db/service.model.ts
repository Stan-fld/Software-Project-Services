import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";

const config = {
    tableName: 'Services',
    timestamps: true,
    sequelize: sequelize
};

class Service extends Model {
    id!: string;
    domain!:string;
}

Service.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, config);

export default Service;

