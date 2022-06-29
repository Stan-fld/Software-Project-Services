import {Role} from "./role.model";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    role: Role;

    static generateModel(json: any): User {
        const user = new User();
        user.id = json.id;
        user.firstName = json.firstName;
        user.lastName = json.lastName;
        user.email = json.email;
        user.address = json.address;
        user.phone = json.phone;
        user.role = Role.generateModel(json.role);

        return user;
    }
}
