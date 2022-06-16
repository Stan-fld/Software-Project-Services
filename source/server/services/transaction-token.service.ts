import jwt from "jsonwebtoken";
import TransactionToken from "../../db/transaction-token.model";
import Transaction from "../../db/transaction.model";
import User from "../../db/user.model";

export class TransactionTokenService extends TransactionToken {

    /**
     * Create transaction token for given transaction and user
     * @param transaction
     * @param user
     */
    static createTransactionToken(transaction: Transaction, user: User): Promise<TransactionToken> {
        const transactionToken = new TransactionToken();

        transactionToken.token = jwt.sign({
            transactionId: transaction.id.toString(),
            userId: user.id.toString(),
            serviceId: transaction.service.id.toString(),
            roleId: transaction.role.toString(),
            iat: Date.now() / 1000
        }, process.env.JWT_SECRET!, {expiresIn: '10m'}).toString();

        return transactionToken.save();
    }

    /**
     * Get transaction token for given token
     * @param token
     */
    static findWithToken(token: string): Promise<TransactionToken> {
        return TransactionToken.findOne({where: {token: token}});
    }

    /**
     * Delete transaction token for given transaction token object
     * @param transactionToken
     */
    static deleteTransactionToken(transactionToken: TransactionToken): Promise<void> {
        return transactionToken.destroy();
    }
}
