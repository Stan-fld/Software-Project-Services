import {Express} from "express";
import {authenticateUser} from "../../middleware/authenticate";
import {TransactionTokenController} from "../../controller/transaction-token.controller";

export class TransactionTokenEndpoints {

    static createTransactionToken(app: Express) {
        app.post('/auth/createTransactionToken', authenticateUser, async (req: any, res) => {

            const response = await TransactionTokenController.createTransactionToken(req.data.transactionCode, req.user);

            res.status(response.code).send(response.data);

        });
    }

    static deleteTransactionToken(app: Express) {
        app.post('/auth/deleteTransactionToken/:transactionToken', authenticateUser, async (req: any, res) => {

            const response = await TransactionTokenController.deleteTransactionToken(req.data.transactionToken);

            res.status(response.code).send(response.data);

        });
    }
}
