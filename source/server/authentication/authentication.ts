import {Express} from "express";
import {createError, mongooseErrors} from "../errors/errors";
import {bodyPick} from "../../middleware/utils";
import {authenticateUser} from "../../middleware/authenticate";

export class Authentication {
    static signUp(app: Express) {

        app.post('/restau/register', authenticateUser, (req: any, res) => {

            const body = bodyPick(['firstName', 'lastName', 'email', 'address', 'phone', 'password'], req.body);

        });
    }

    static signIn(app: Express) {

        app.post('/restau/login', authenticateUser, (req, res) => {

            const body = bodyPick(['email', 'password'], req.body);


            body.email = body.email.toLowerCase();


            Restaurant.findWithEmailPass(body.email, body.password).then((restaurant: Restaurant) => {

                return restaurant.createAuthToken(clientInfo.client, clientInfo.clientId);

            }).then((data) => {

                if (data.token == null) {
                    return res.status(400).send(createError('CouldNotCreateToken', 'Could not create token'));
                }

                return res.status(200).send({data: {currentRestaurant: data.restaurant, tokens: data.token}});

            }).catch((e) => {

                return res.status(401).send(mongooseErrors(e));

            });
        });
    }
}
