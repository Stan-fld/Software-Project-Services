import jwt from "jsonwebtoken";
import TransactionToken from "../../db/transaction-token.model";
import Transaction from "../../db/transaction.model";
import User from "../../db/user.model";
import {v4} from "uuid";

export class TransactionTokenService {

    /**
     * Service to create a transaction token for given transaction and user
     * @param transaction
     * @param user
     * @param transactionToken
     */
    static createTransactionToken(transactionToken: TransactionToken, transaction: Transaction, user: User): Promise<TransactionToken> {

        transactionToken.id = v4();
        transactionToken.userId = user.id;
        transactionToken.transactionId = transaction.id;

        transactionToken.token = jwt.sign({
            id: transactionToken.id,
            iat: Date.now() / 1000
        }, process.env.jwt_secret!, {expiresIn: '10m'}).toString();

        return transactionToken.save();
    }

    /**
     * Service to find a transaction token for given user id
     * @param userId
     */
    static findWithUserId(userId: string) {
        return TransactionToken.findOne({where: {userId: userId}});
    }

    /**
     * Service to find a transaction token for given token
     * @param token
     */
    static findWithToken(token: string): Promise<TransactionToken> {
        return TransactionToken.findOne({where: {token: token}});
    }

    /**
     * Service to find a transaction token for given token and id
     * @param token
     * @param transactionTokenId
     */
    static findWithTokenAndId(token: string, transactionTokenId: string): Promise<TransactionToken> {
        return TransactionToken.findOne({where: {id: transactionTokenId, token: token}});
    }

    /**
     * Service to delete a transaction token for given transaction token object
     * @param transactionToken
     */
    static deleteTransactionToken(transactionToken: TransactionToken): Promise<void> {
        return transactionToken.destroy();
    }
}
