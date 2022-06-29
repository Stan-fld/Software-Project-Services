import axios from "axios";
import {createError} from "../server/errors/errors";
import User from "../db/user.model";

export async function authenticateTransaction(req: any, res, next: any) {

    const transactionToken: string = req.header('trx-auth');

    try {
        const {data}: { data: { isConfirmed: boolean, user: User } } = await axios.get(
            'http://nginx:80/auth/confirmTransaction/' + transactionToken,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        if (!data.isConfirmed) {
            return res.status(403).send(createError('TransactionNotConfirmed', 'The transaction is not confirmed', 403).data);
        }

        req.user = data.user;
        next();
    } catch (e) {
        if (!e.response) {
            return res.status(500).send({message: 'Internal server user error'});
        }

        return res.status(e.response.status).send(e.response.data);
    }
}
