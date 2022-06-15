import jwt from "jsonwebtoken";
import TransactionToken from "../../db/transaction-token.model";
import Transaction from "../../db/transaction.model";
import User from "../../db/user.model";

export class TransactionTokenService extends TransactionToken {

    static createTransactionToken(transaction: Transaction, user: User) {
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

    static findWithToken(token: string) {
        return TransactionToken.findOne({where: {token: token}});
    }

    static deleteTransactionToken(transactionToken: TransactionToken) {
        return transactionToken.destroy();
    }
}
