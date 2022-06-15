import './config/config.js';
import express, {Express} from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import {cors} from "./middleware/cors";
import {Authentication} from "./server/authentication/authentication";
import sequelize from "./db/setup/db-mysql-setup";
import {TransactionTokenEndpoints} from "./server/transaction-token/transaction-token-endpoints";


const env = process.env.NODE_ENV;
const app: Express = express();

app.use(cors);
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

Authentication.signUp(app);
Authentication.signIn(app);

TransactionTokenEndpoints.createTransactionToken(app);
TransactionTokenEndpoints.deleteTransactionToken(app);

// Handling Errors and 404
app.use(function (req, res) {
    const error = [{
        name: 'NoExistingRoute',
        message: 'Route ' + req.originalUrl + ' with: ' + req.method + ' does not exist.',
        code: 404
    }];
    res.status(404).send({error});
});

if (env !== "test") {
    const PORT: any = process.env.PORT ?? 3000;
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
} else {
    afterAll(() => {
        sequelize.close();
    });
}

export = app;
