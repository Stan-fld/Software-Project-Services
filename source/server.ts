import './config/config.js';
import express, {Express} from "express";
import methodOverride from "method-override";
import {cors} from "./middleware/cors";
import {AuthenticationEndpoints} from "./server/enpoints/authentication/authentication-endpoints";
import sequelize from "./db/setup/db-mysql-setup";
import {TransactionTokenEndpoints} from "./server/enpoints/transaction-token/transaction-token-endpoints";


const env = process.env.NODE_ENV;
const app: Express = express();

app.use(cors);
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));

AuthenticationEndpoints.signUp(app);
AuthenticationEndpoints.signIn(app);

TransactionTokenEndpoints.createTransactionToken(app);
TransactionTokenEndpoints.deleteTransactionToken(app);
TransactionTokenEndpoints.confirmTransaction(app);

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
    const PORT: any = process.env.port ?? 3000;
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
} else {
    afterAll(() => {
        sequelize.close();
    });
}

export = app;
