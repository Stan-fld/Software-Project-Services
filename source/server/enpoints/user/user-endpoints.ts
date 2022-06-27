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

    /**
     * Endpoint for delete user
     * @param app
     */
    static deleteUser(app: Express) {

        app.delete('/users/deleteUser', authenticateTransaction, async (req: any, res) => {

            const response = await UserController.deleteUser(req.userId);

            res.status(response.code).send(response.data);

        });
    }

    static changePassword(app: Express) {

        app.patch('/users/changeUserPassword', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['oldPassword', 'newPassword'], req.body);

            const response = await UserController.changePassword(req.userId, body);

            res.status(response.code).send(response.data);

        });
    }
}