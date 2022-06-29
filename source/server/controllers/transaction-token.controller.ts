import {createError, sequelizeErrors} from "../errors/errors";
import {TransactionService} from "../services/transaction.service";
import {TransactionTokenService} from "../services/transaction-token.service";
import User from "../../db/user.model";
import Transaction from "../../db/transaction.model";
import TransactionToken from "../../db/transaction-token.model";
import jwt from "jsonwebtoken";
import {UserService} from "../services/user.service";
import _ from "lodash";

export class TransactionTokenController {

    /**
     * Controller to create a transaction token for a given transaction code and user.
     * @param transactionCode
     * @param user
     */
    static async createTransactionToken(transactionCode: string, user: User) {

        try {
            const transaction: Transaction = await TransactionService.findWithCodeAndUserRole(transactionCode, user);

            if (!transaction) {
                return createError('CouldNotFindTransaction', 'Could not find transaction for given code and user role', 404);
            }

            if (!transaction.role) {
                return createError('CouldNotFindRole', 'Could not find transaction role for given code and user role', 404);
            }

            if (!transaction.service) {
                return createError('CouldNotFindService', 'Could not find transaction services for given code and user role', 404);
            }

            const transactionToken = await TransactionTokenService.createTransactionToken(transaction, user);

            return {data: {transaction, transactionToken}, code: 201};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to delete the transaction token for a given token.
     * @param token
     */
    static async deleteTransactionToken(token: string) {

        try {
            const transactionToken: TransactionToken = await TransactionTokenService.findWithToken(token);

            if (!transactionToken) {
                return createError('CouldNotFindTransaction', 'Could not find transaction token for given token', 404);
            }

            await TransactionTokenService.deleteTransactionToken(transactionToken);

            return {data: {message: 'Destroyed transaction token'}, code: 200};

        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to get and confirm the transaction for a given token.
     * @param token
     */
    static async confirmTransactionToken(token: string) {

        let decodedToken;

        try {
            decodedToken = jwt.verify(token, process.env.jwt_secret!);
        } catch (e) {
            return createError('TokenMalformedOrExpired', 'Transaction token is malformed or expired', 401);
        }

        try {

            const transactionToken: TransactionToken = await TransactionTokenService.findWithTokenAndId(token, decodedToken.id);

            if (!transactionToken) {
                return createError('CouldNotFindTransaction', 'Could not find transaction token for given token', 404);
            }

            const transaction: Transaction = await TransactionService.findWithId(transactionToken.transactionId);

            if (!transaction) {
                return createError('CouldNotFindTransaction', 'Could not find transaction for given token', 404);
            }

            const user: User = await UserService.findWithId(transactionToken.userId);

            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given token', 404);
            }

            if (!_.isEqual(transaction.role, user.role)) {
                return createError('UserRoleMismatch', 'User role does not match transaction role', 403);
            }

            return {data: {isConfirmed: true, user: user}, code: 200};

        } catch (e) {
            const err = sequelizeErrors(e);
            err.data['isConfirmed'] = false;
            return {data: err.data, code: err.code};
        }

    }
}
