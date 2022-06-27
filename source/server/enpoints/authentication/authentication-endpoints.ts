import {Express} from "express";
import {bodyPick} from "../../../middleware/utils";
import {AuthenticationController} from "../../controllers/authentication.controller";
import {authenticateUser} from "../../../middleware/authenticate";

export class AuthenticationEndpoints {

    /**
     * Endpoint for creating a new user
     * @param app
     */
    static signUp(app: Express) {

        app.post('/auth/register', async (req: any, res) => {

            const body = bodyPick(['firstName', 'lastName', 'email', 'address', 'phone', 'password', 'roleId'], req.body);

            const response = await AuthenticationController.createUser(body);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint for user authentication
     * @param app
     */
    static signIn(app: Express) {

        app.post('/auth/login', async (req, res) => {


            const body = bodyPick(['email', 'password'], req.body);

            const response = await AuthenticationController.authenticateUser(body);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint for user logout
     * @param app
     */
    static signOut(app: Express) {

        app.get('/auth/logout', authenticateUser, async (req: any, res) => {

            const response = await AuthenticationController.logoutUser(req.user);

            res.status(response.code).send(response.data);

        });
    }
}
