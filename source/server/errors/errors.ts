export function createError(name: string, message: string, code: number) {

    return {data: [{name, message}], code: code};

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
                const errorCode = errors[key].code;
                const error = {name, message, code: errorCode};
                list.push(error);
            }
        }

        return {data: list, code: list[0].code || 400};
    } else if (code !== null && code !== undefined) {

        const errorModel = {name: '', message: mongooseError['errmsg'], code: mongooseError['code'].toString()};

        return {data: [errorModel], code: mongooseError['code'] || 400};
    }

    return {
        data: [{name: 'mongooseError', message: 'Undefined mongoose error on restaurant service', code: 400}],
        code: 400
    };
}
