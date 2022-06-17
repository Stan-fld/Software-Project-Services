import {createError, sequelizeErrors} from "../errors/errors";
import {UserService} from "../services/user.service";
import User from "../../db/user.model";
import {RoleService} from "../services/role.service";
import Role from "../../db/role.model";
import {roles} from "../../config/enums";

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

            user = await UserService.createAuthToken(user);

            return {data: {user}, code: 200};
        } catch (e) {
            return {data: sequelizeErrors(e).data, code: 401};
        }
    }

    /**
     * Controller to create a new user
     * @param body
     */
    static async createUser(body: { firstName: string, lastName: string, email: string, address: string, phone: string, password: string, roleId: string }) {

        switch (undefined) {
            case body.firstName:
                return createError('NoFirstNameFound', 'First name required, no first name found', 400);

            case body.lastName:
                return createError('NoLastNameFound', 'Last name required, no last name found', 400);

            case body.email:
                return createError('NoEmailFound', 'Email address required, no address found', 400);

            case body.password:
                return createError('NoPasswordFound', 'Password required, no password found', 400);

            case body.address:
                return createError('NoAddressFound', 'Address required, no address found', 400);

            case body.phone:
                return createError('NoPhoneFound', 'Phone number required, no phone number found', 400);

        }
        body.email = body.email.toLowerCase();

        try {
            const user: User = await UserService.findWithEmail(body.email);
            if (user) {
                return createError('UserAlreadyExists', 'The user already exists for the given email', 400);
            }

            const role: Role = await RoleService.findWithName(roles.client);
            if (!role) {
                return createError('RoleNotFound', 'The role was not found', 400);
            }
            body.roleId = role.id;

            let newUser: User = new User(body);
            newUser.role = role;
            newUser = await UserService.createAuthToken(newUser);

            return {data: {user: newUser}, code: 201};

        } catch (e) {
            return sequelizeErrors(e);
        }
    }
}
