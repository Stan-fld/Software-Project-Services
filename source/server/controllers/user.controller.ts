import {createError} from "../errors/errors";

export class UserController {

    static createUser(body: any) {


        if (body.email === undefined) {
            return createError('NoEmailFound', 'Email address required, no address found', 400);
        }
        body.email = body.email.toLowerCase();


    }
}
