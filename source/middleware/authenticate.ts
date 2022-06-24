import {authenticationFailed, sequelizeErrors} from "../server/errors/errors";
import jwt from "jsonwebtoken";
import {UserService} from "../server/services/user.service";
import User from "../db/user.model";

export async function authenticateUser(req: any, res, next: any) {

    const accessToken: string = req.header('x-auth');
    let decodedAccessToken;
    let decodedRefreshToken;
    let user: User;

    try {
        decodedAccessToken = jwt.verify(accessToken, process.env.jwt_secret!, {ignoreExpiration: true});
    } catch (e) {
        return res.status(401).send(authenticationFailed('AccessToken is malformed', 401).data);
    }

    try {
        user = await UserService.findWithAccessToken(decodedAccessToken.id, accessToken);

        if (!user) {
            return res.status(401).send(authenticationFailed('Cannot find user for given access token', 401).data);
        }
    } catch (e) {
        return res.status(401).send(sequelizeErrors(e).data);
    }

    if (decodedAccessToken.exp * 1000 < Date.now()) {

        try {
            decodedRefreshToken = jwt.verify(user.refreshToken, process.env.jwt_secret!, {ignoreExpiration: true});
        } catch (e) {
            return res.status(401).send(authenticationFailed('RefreshToken is malformed', 401).data);
        }

        if (decodedRefreshToken.exp * 1000 < Date.now()) {
            return res.status(401).send(authenticationFailed('The access and refresh tokens has expired', 401).data);
        }

        user.accessToken = jwt.sign({
            id: user.id.toString(),
            roleId: user.roleId.toString(),
            iat: Date.now() / 1000
        }, process.env.jwt_secret!, {expiresIn: '1h'}).toString();

        await user.save();
    }

    req.user = user;
    next();
}
