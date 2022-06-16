import {Express} from "express";
import {authenticateUser} from "../../../middleware/authenticate";
import {TransactionTokenController} from "../../controllers/transaction-token.controller";

export class TransactionTokenEndpoints {

    /**
     * Endpoint for create transaction token
     * @param app
     */
    static createTransactionToken(app: Express) {
        app.post('/auth/createTransactionToken', authenticateUser, async (req: any, res) => {

            const response = await TransactionTokenController.createTransactionToken(req.data.transactionCode, req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint for delete transaction token
     * @param app
     */
    static deleteTransactionToken(app: Express) {
        app.post('/auth/deleteTransactionToken/:transactionToken', async (req: any, res) => {

            const response = await TransactionTokenController.deleteTransactionToken(req.data.transactionToken);

            res.status(response.code).send(response.data);

        });
    }
}
