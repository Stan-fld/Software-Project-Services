import {UserService} from "../services/user.service";
import {createError, sequelizeErrors} from "../errors/errors";
import User from "../../db/user.model";
import {v4} from "uuid";
import Role from "../../db/role.model";
import {RoleService} from "../services/role.service";
import {HttpService} from "../services/http.service";
import {roles} from "../../config/enums";

export class UserController {

    /**
     * Controller to update user
     * @param userId
     * @param role
     * @param body
     */
    static async updateUser(userId: string, role: Role, body: { firstName: string, lastName: string, address: string, phone: string }) {
        try {
            let user: User = await UserService.findWithId(userId);

            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }

            user.firstName = body.firstName || user.firstName;
            user.lastName = body.lastName || user.lastName;
            user.address = body.address || user.address;
            user.phone = body.phone || user.phone;

            user = await UserService.saveUser(user);
            user.role = role;

            return {data: user, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to delete user
     * @param userId
     * @param role
     */
    static async deleteUser(userId: string, role: Role) {
        let user: User;

        try {
            user = await UserService.findWithId(userId);
            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }
        } catch (e) {
            return sequelizeErrors(e);
        }

        try {
            let data;
            switch (role.name) {
                case roles.restau:
                    data = (await new HttpService(user.accessToken).closeMyRestaurant()).data.data;
                    if (!data.success) {
                        return createError('CouldNotCloseRestaurant', 'Could not close your restaurant', 500);
                    }
                    break;

                case roles.deliverer:
                    data = (await new HttpService(user.accessToken).revokeMyDelivererAccount()).data.data;
                    if (!data.success) {
                        return createError('CouldNotRevokeDelivererAccount', 'Could not revoke your deliverer account', 500);
                    }
                    break;

                default:
                    break;
            }
        } catch (e) {
            if (!e.response) {
                return createError('InternalServerError', 'Internal server error on user service', 500);
            }

            return {data: e.response.data.data, code: e.response.status};
        }

        try {
            user.firstName = 'User';
            user.lastName = 'Deleted';
            user.email = 'user.deleted-' + user.id + '@ceseat.fr';
            user.password = '9kd' + v4().toString() + '2daz';
            user.phone = '+33600000000';
            user.address = 'User deleted address';
            user.accessToken = null;
            user.refreshToken = null;

            await UserService.saveUser(user);

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

            user = await UserService.saveUser(user);

            return {data: user, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }

    /**
     * Controller to change user role
     * @param adminId
     * @param body
     */
    static async changeUserRole(adminId: string, body: { userId: string, roleName: string }) {
        try {

            if (!body.userId || !body.roleName) {
                return createError('MissingData', 'User identifier, Role name or restaurant identifier is missing', 400);
            }

            let user: User = await UserService.findWithId(body.userId);

            if (!user) {
                return createError('CouldNotFindUser', 'Could not find user for given identifier', 404);
            }

            const role = await RoleService.findWithName(body.roleName);

            if (!role) {
                return createError('CouldNotFindRole', 'Could not find role for given name', 404);
            }

            const adminToken: string = (await UserService.findWithId(adminId)).accessToken;

            if (!adminToken) {
                return createError('CouldNotFindAdmin', 'Could not find admin for given identifier', 404);
            }

            return await this.roleChangeAction(user, role, adminToken);

        } catch (e) {
            return sequelizeErrors(e);
        }

    }

    /**
     * Controller to do some action on user role change.
     * @param user
     * @param role
     * @param adminToken
     * @private
     */
    private static async roleChangeAction(user: User, role: Role, adminToken: string) {
        try {
            let data;
            switch (role.name) {
                case roles.restau:
                    data = (await new HttpService(adminToken).openUserRestaurant(user.id)).data.data;
                    if (!data.success) {
                        return createError('CouldNotOpenRestaurant', 'Could not open restaurant', 400)
                    }
                    break;

                case roles.deliverer:
                    data = (await new HttpService(adminToken).allowUserDeliverer(user.id)).data.data;

                    if (!data.success) {
                        return createError('CouldNotAllowDeliverer', 'Could not allow deliverer', 400)
                    }
                    break;

                default:
                    break;
            }
        } catch (e) {
            if (!e.response) {
                return createError('InternalServerError', 'Internal server error on user service', 500);
            }

            return {data: e.response.data.data, code: e.response.status};
        }

        try {
            user.roleId = role.id;
            user = await UserService.saveUser(user);
            user.role = role;

            return {data: user, code: 200};

        } catch (e) {
            return sequelizeErrors(e);
        }
    }
}
