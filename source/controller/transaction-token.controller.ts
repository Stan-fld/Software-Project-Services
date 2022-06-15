import {createError, mongooseErrors} from "../server/errors/errors";
import {TransactionService} from "../service/transaction.service";
import {TransactionTokenService} from "../service/transaction-token.service";
import User from "../db/user.model";
import Transaction from "../db/transaction.model";
import TransactionToken from "../db/transaction-token.model";

export class TransactionTokenController {

    static async createTransactionToken(transactionCode: string, user: User) {

        try {
            const transaction: Transaction = await TransactionService.getTransactionByCode(transactionCode);

            if (!transaction) {
                return createError('CouldNotFindTransaction', 'Could not find transaction for given code', 404);
            }

            if (!transaction.role) {
                return createError('CouldNotFindRole', 'Could not find transaction role for given code', 404);
            }

            if (!transaction.service) {
                return createError('CouldNotFindService', 'Could not find transaction service for given code', 404);
            }

            const transactionToken: TransactionToken = await TransactionTokenService.createTransactionToken(transaction, user);

            return {data: {transaction, transactionToken}, code: 201};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    static async deleteTransactionToken(token: string) {

            try {
                const transactionToken:TransactionToken =  await TransactionTokenService.findWithToken(token);

                if (!transactionToken) {
                    return createError('CouldNotFindTransaction', 'Could not find transaction token for given token', 404);
                }

                await TransactionTokenService.deleteTransactionToken(transactionToken);

                return {data: {message:'Destroyed transaction token'}, code: 200};

            } catch (e) {
                return mongooseErrors(e);
            }
    }
}
