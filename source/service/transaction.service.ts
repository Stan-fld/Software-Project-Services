import Transaction from "../db/transaction.model";


export class TransactionService extends Transaction {


    static getTransactionByCode(transactionCode: string) {
        return this.findOne({where: {code: transactionCode}, include: ['role', 'service']});
    }
}
