import {authenticationFailed, mongooseErrors} from "../server/errors/errors";
import jwt from "jsonwebtoken";
import {UserService} from "../service/user.service";
import User from "../db/user.model";

export async function authenticateUser(req: any, res: any, next: any) {

    const accessToken: string = req.header('x-auth');
    let decodedAccessToken;
    let decodedRefreshToken;
    let user: User;

    try {
        decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET!, {ignoreExpiration: true});
    } catch (e) {
        return res.status(400)(authenticationFailed('AccessToken is malformed', 400));
    }

    try {
        user = await UserService.findWithAccessToken(decodedAccessToken.id, accessToken);

        if (!user) {
            return res.status(400)(authenticationFailed('Cannot find user for given access token', 400));
        }
    } catch (e) {
        return res.status(400)(mongooseErrors(e));
    }

    if (decodedAccessToken.exp * 1000 < Date.now()) {

        try {
            decodedRefreshToken = jwt.verify(user.refreshToken, process.env.JWT_SECRET!, {ignoreExpiration: true});
        } catch (e) {
            return res.status(400)(authenticationFailed('RefreshToken is malformed', 400));
        }

        if (decodedRefreshToken.exp * 1000 < Date.now()) {
            return res.status(400)(authenticationFailed('The access and refresh tokens has expired', 400));
        }

        user.accessToken = jwt.sign({
            id: user.id.toString(),
            roleId: user.roleId.toString(),
            iat: Date.now() / 1000
        }, process.env.JWT_SECRET!, {expiresIn: '1h'}).toString();

        await user.save();
    }

    req.user = user;
    next();
}
