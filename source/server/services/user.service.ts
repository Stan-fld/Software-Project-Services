import User from "../../db/user.model";
import bcrypt from "bcrypt";

export class UserService {


    /**
     * Service to find a user with a given id
     * @param userId
     */
    static findWithId(userId: string): Promise<User> {
        return User.findByPk(userId);
    }

    /**
     * Service to save a user
     * @param user
     */
    static saveUser(user: User): Promise<User> {
        return user.save();
    }

    /**
     * Service to compare a password with user password
     * @param user
     * @param password
     */
    static comparePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}
