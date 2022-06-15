import jwt from "jsonwebtoken";
import User from "../db/user.model";

export class UserService {

    user: User;

    constructor(user: User) {
        this.user = user;
    }

    createAuthToken() {

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

    static findWithAccessToken(userId: string, accessToken: string) {
        return User.findOne({where: {accessToken: accessToken, id: userId}});
    }
}
