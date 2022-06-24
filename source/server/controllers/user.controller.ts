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

            return {data: {user}, code: 200};
        } catch (e) {
            return sequelizeErrors(e);
        }
    }
}
