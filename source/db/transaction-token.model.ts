import jwt from "jsonwebtoken";
import {createError, mongooseErrors} from "../server/errors/errors";
import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";
import Role from "./role.model";
import Transaction from "./transaction.model";


const config = {
    tableName: 'TransactionTokens',
    timestamps: true,
    sequelize: sequelize
};

class TransactionToken extends Model {
    id!: string;
    token!: string;

    createTransactionToken(transactionCode: string) {

        return Transaction.findOne({where: {code: transactionCode}}).then((transaction: Transaction) => {

            if (!transaction) {
                return Promise.reject(createError('CouldNotFindTransaction', 'Could not find transaction for given code', 404));
            }

            return Role.findOne({where: {_id: transaction.role}}).then((role: Role) => {

                if (!role) {
                    return Promise.reject(createError('CouldNotFindRole', 'Could not find transaction role for given code', 404));
                }

                this.token = jwt.sign({
                    roleId: transaction.role,
                    transactionId: transaction.id,
                    iat: Date.now() / 1000
                }, process.env.JWT_SECRET!, {expiresIn: '2h'}).toString();

                return this.save().then((transactionToken: TransactionToken) => {

                    if (!transactionToken) {
                        return Promise.reject(createError('CouldNotCreateToken', 'Could not create token', 400));
                    }

                    return {transaction, transactionToken, role};

                }).catch((e) => {
                    return Promise.reject(mongooseErrors(e))
                });
            })

        }).catch((e) => {
            return Promise.reject(mongooseErrors(e))
        })

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

export default TransactionToken;
