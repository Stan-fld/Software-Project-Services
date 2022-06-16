import Transaction from "../../db/transaction.model";
import User from "../../db/user.model";


export class TransactionService extends Transaction {

    /**
     * Return transaction for given code and user role
     * @param transactionCode
     * @param user
     */
    static getTransactionByCodeAndUserRole(transactionCode: string, user:User): Promise<Transaction> {
        return this.findOne({where: {code: transactionCode, roleId: user.roleId}, include: ['role', 'service']});
    }
}
