import {Express} from "express";
import {authenticateUser} from "../../../middleware/authenticate";
import {TransactionTokenController} from "../../controllers/transaction-token.controller";

export class TransactionTokenEndpoints {

    /**
     * Endpoint for create transaction token
     * @param app
     */
    static createTransactionToken(app: Express) {
        app.get('/auth/createTransactionToken/:transactionCode', authenticateUser, async (req: any, res) => {

            const response = await TransactionTokenController.createTransactionToken(req.params.transactionCode, req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint for delete transaction token
     * @param app
     */
    static deleteTransactionToken(app: Express) {
        app.delete('/auth/deleteTransactionToken/:transactionToken', async (req: any, res) => {

            const response = await TransactionTokenController.deleteTransactionToken(req.params.transactionToken);

            res.status(response.code).send(response.data);

        });
    }
}
