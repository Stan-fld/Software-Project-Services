export function createError(name: string, message: string, code: number) {

    return {data: {name, message}, code: code};

}


export function authenticationFailed(message: string, code: any) {

    return createError('AuthenticationFailed', message, code);
}

export function sequelizeErrors(sequelizeError: any) {
    console.log(sequelizeError);
    /*
    const errors = sequelizeError['errors'];
    const code = sequelizeError['code'];

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

        const errorModel: IError = {name: '', message: sequelizeError['errmsg'], code: sequelizeError['code'].toString()};

        return {data: [errorModel], code: errorModel.code};
    }
     */

    return {data: 'Sequelize Error', code: 400};
}
