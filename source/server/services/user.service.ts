import jwt from "jsonwebtoken";
import User from "../../db/user.model";
import bcrypt from "bcrypt";

export class UserService {

    user: User;

    constructor(user: User) {
        this.user = user;
    }

    /**
     * Create a new auth token for the user
     */
    createAuthToken(): Promise<User> {

        this.user.accessToken = jwt.sign({
            _id: this.user.id.toString(),
            iat: Date.now() / 1000
        }, process.env.JWT_SECRET!, {expiresIn: '1h'}).toString();

        this.user.refreshToken = jwt.sign({
            _id: this.user.id.toString(),
            iat: Date.now() / 1000
        }, process.env.JWT_SECRET!, {expiresIn: '48h'}).toString();

        return this.user.save();
    }

    static findWithAccessToken(userId: string, accessToken: string): Promise<User> {
        return User.findOne({where: {accessToken: accessToken, id: userId}, include: ['role']});
    }

    static findWithEmail(email: string): Promise<User> {
        return User.findOne({where: {email: email}, include: ['role']});
    }

    static comparePassword(user: User, password: string) {
        return bcrypt.compare(password, user.password);
    }
}
