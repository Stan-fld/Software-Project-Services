interface IError {
    name: string;
    message: string;
    code: any;
}

export function createError(name: string, message: string, code: number) {

    return {data: {name, message}, code: code};

}


export function authenticationFailed(message: string, code: any) {

    return createError('AuthenticationFailed', message, code);
}

export function mongooseErrors(mongooseError: any) {
    const errors = mongooseError['errors'];
    const code = mongooseError['code'];

    if (errors !== null && errors !== undefined) {

        const list = [];

        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                const name = errors[key].name;
                const message = errors[key].message;
                const code = errors[key].code;
                const error: IError = {name, message, code};
                list.push(error);
            }
        }

        return {data: list, code: list[0].code};
    } else if (code !== null && code !== undefined) {

        const errorModel: IError = {name: '', message: mongooseError['errmsg'], code: mongooseError['code'].toString()};

        return {data: [errorModel], code: errorModel.code};
    }

    return {data: 'Mongoose Error', code: 400};
}
