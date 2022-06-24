import jwt from "jsonwebtoken";
import User from "../../db/user.model";
import bcrypt from "bcrypt";

export class UserService {

    /**
     * Service to create a new auth token for the user
     * @param user
     */
    static createAuthToken(user: User): Promise<User> {

        user.accessToken = jwt.sign({
            id: user.id.toString(),
            iat: Date.now() / 1000
        }, process.env.jwt_secret!, {expiresIn: '1h'}).toString();

        user.refreshToken = jwt.sign({
            id: user.id.toString(),
            iat: Date.now() / 1000
        }, process.env.jwt_secret!, {expiresIn: '48h'}).toString();

        return user.save();
    }

    /**
     * Service to find a user with access token
     * @param userId
     * @param accessToken
     */
    static findWithAccessToken(userId: string, accessToken: string): Promise<User> {
        return User.findOne({where: {accessToken: accessToken, id: userId}, include: ['role']});
    }

    /**
     * Service to find a user with refresh email
     * @param email
     */
    static findWithEmail(email: string): Promise<User> {
        return User.findOne({where: {email: email}, include: ['role']});
    }

    static findWithId(userId: string): Promise<User> {
        return User.findByPk(userId, {include: ['role']});
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
