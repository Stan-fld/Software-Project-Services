import {Express} from "express";
import {bodyPick} from "../../../middleware/utils";
import {AuthenticationController} from "../../controllers/authentication.controller";

export class AuthenticationEndpoints {

    /**
     * Endpoint for creating a new user
     * @param app
     */
    static signUp(app: Express) {

        app.post('/auth/register', (req: any, res) => {

            //const body = bodyPick(['firstName', 'lastName', 'email', 'address', 'phone', 'password'], req.body);

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
}
