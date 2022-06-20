import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";
import User from "./user.model";
import Transaction from "./transaction.model";
import {bodyPick} from "../middleware/utils";


const config = {
    tableName: 'TransactionTokens',
    timestamps: true,
    sequelize: sequelize
};

class TransactionToken extends Model {
    id!: string;
    userId!: string;
    transactionId!: string;
    token!: string;

    toJSON() {

        return bodyPick(['token'], this);

    }
}

TransactionToken.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, config);
User.hasOne(TransactionToken, {foreignKey: 'userId', as: 'transactionToken'});
TransactionToken.belongsTo(User, {foreignKey: 'userId', as: 'user'});

Transaction.hasMany(TransactionToken, {foreignKey: 'transactionId', as: 'transactionTokens'});
TransactionToken.belongsTo(Transaction, {foreignKey: 'transactionId', as: 'transaction'});

export default TransactionToken;
