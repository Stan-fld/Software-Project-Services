export function createError(name: string, message: string, code: number) {

    return {data: [{name, message}], code: code};

}


export function authenticationFailed(message: string, code: number) {

    return createError('AuthenticationFailed', message, code);
}

export function sequelizeErrors(sequelizeError: any) {
    const errors = sequelizeError['errors'];

    if (errors !== null && errors !== undefined) {

        const list = [];

        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                let message = errors[key].message.split('.');

                const name = 'SequelizeError ' + errors[key].type;
                message = message[message.length - 1];
                const code = errors[key].code || 400;
                const error = {name, message, code};
                list.push(error);
            }
        }

        return {data: list, code: list[0].code};
    }

    return {
        data: [{name: 'SequelizeError Undefined', message: 'Undefined sequelize error on authentication service', code: 400}],
        code: 400
    };
}
