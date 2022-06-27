import {UserService} from "../services/user.service";
import {createError, sequelizeErrors} from "../errors/errors";
import User from "../../db/user.model";
import {Role} from "../../models/role.model";

export class UserController {

    static async updateUser(userId: string, role: Role, body: { firstName: string, lastName: string, address: string, phone: string }) {
        try {
            let user: User = await UserService.findWithId(userId);

            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }

            user.firstName = body.firstName;
            user.lastName = body.lastName;
            user.address = body.address;
            user.phone = body.phone;

            user = await UserService.updateUser(user);
            user.role = Role.generateModel(role);

            return {data: user, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to delete user
     * @param userId
     */
    static async deleteUser(userId: string) {
        try {
            const user: User = await UserService.findWithId(userId);

            //TODO: Check user role and delete user data in mongodb.
            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }

            await UserService.deleteUser(user);

            return {data: {success: true}, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to change user password
     * @param userId
     * @param body
     */
    static async changePassword(userId: string, body: { oldPassword: string, newPassword: string }) {
        try {
            let user: User = await UserService.findWithId(userId);

            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }

            if (!body.newPassword) {
                return createError('MissingNewPassword', 'New password is missing', 400);
            }

            const isPasswordValid = await UserService.comparePassword(user, body.oldPassword);

            if (!isPasswordValid) {
                return createError('InvalidGivenPassword', 'Given password does not match with current password', 400);
            }

            user.password = body.newPassword;

            user = await UserService.updateUser(user);

            return {data: user, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }
}
