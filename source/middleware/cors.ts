export function cors(req: any, res: any, next: any) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTION');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth, secret, Origin');

    if (req.method === 'OPTIONS') {

        res.status(200).send({msg: 'Which pill, blue or red ?'});

    } else {
        next();
    }
}
