import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {UserController} from "../../controllers/user.controller";

export class UserEndpoints {

    /**
     * Endpoint for update user
     * @param app
     */
    static updateUser(app: Express) {
        app.patch('/users/updateUser', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['firstName', 'lastName', 'address', 'phone'], req.body);

            const response = await UserController.updateUser(req.userId, req.role, body);

            res.status(response.code).send(response.data);

        });
    }
}
