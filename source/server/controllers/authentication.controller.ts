import {createError, sequelizeErrors} from "../errors/errors";
import {UserService} from "../services/user.service";
import User from "../../db/user.model";

export class AuthenticationController {

    /**
     * Controller to authenticate the user with email and password
     * @param body {email: string, password: string}
     */
    static async authenticateUser(body: { email: string, password: string }) {

        if (body.email === undefined) {
            return createError('NoEmailFound', 'Email address required, no address found', 400);
        }
        body.email = body.email.toLowerCase();

        try {
            let user: User = await UserService.findWithEmail(body.email);

            if (!user) {
                return createError('InvalidEmailOrPassword', 'Invalid email or password', 401);
            }

            const isPasswordValid: boolean = await UserService.comparePassword(user, body.password);

            if (!isPasswordValid) {
                return createError('InvalidEmailOrPassword', 'Invalid email or password', 401);
            }

            user = await new UserService(user).createAuthToken();

            return {data: {user}, code: 200};
        } catch (e) {
            return {data: sequelizeErrors(e).data, code: 401};
        }
    }
}
