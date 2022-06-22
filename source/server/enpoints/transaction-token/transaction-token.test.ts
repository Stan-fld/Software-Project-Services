import request from 'supertest';
import app from "../../../server";
import {
    PopulateRoles,
    PopulateServices,
    PopulateTransactions,
    PopulateUsers,
    SeedRoles,
    SeedServices,
    SeedTransactions,
    SeedUsers
} from "../../seed-data";
import TransactionToken from "../../../db/transaction-token.model";


describe('GET /auth/createTransactionToken/:transactionCode', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateServices);
    beforeEach(PopulateTransactions);
    beforeEach(PopulateUsers);
    beforeEach(removeTransactionTokens);

    it('should create one transaction token', (done) => {

        let transactionToken;
        request(app)
            .get('/auth/createTransactionToken/UU')
            .set('x-auth', SeedUsers[0].accessToken)
            .then((res) => {

                if (res.error) {
                    console.log(res.error);
                }
                expect(res.body.transaction.id).toBe(SeedTransactions[0].id);
                expect(res.body.transaction.code).toBe(SeedTransactions[0].code);
                expect(res.body.transaction.method).toBe(SeedTransactions[0].method);
                expect(res.body.transaction.name).toBe(SeedTransactions[0].name);
                expect(res.body.transaction.desc).toBe(SeedTransactions[0].desc);
                expect(res.body.transaction.role.id).toBe(SeedRoles[2].id);
                expect(res.body.transaction.role.name).toBe(SeedRoles[2].name);
                expect(res.body.transaction.role.desc).toBe(SeedRoles[2].desc);
                expect(res.body.transaction.service.id).toBe(SeedServices[2].id);
                expect(res.body.transaction.service.domain).toBe(SeedServices[2].domain);
                expect(res.body.transactionToken.token).toBeDefined();
                transactionToken = res.body.transactionToken.token;

                request(app)
                    .get('/auth/createTransactionToken/UU')
                    .set('x-auth', SeedUsers[0].accessToken)
                    .then((res) => {

                        expect(res.body.transactionToken.token).not.toBe(transactionToken);
                        done();
                    });
            });
    });

    it('should return transaction not found', (done) => {

        request(app)
            .get('/auth/createTransactionToken/UEZR')
            .set('x-auth', SeedUsers[0].accessToken)
            .then((res) => {

                expect(res.status).toBe(404);
                expect(res.body.name).toBe('CouldNotFindTransaction');
                done();

            });
    });

    it('should return user not found', (done) => {
        request(app)
            .get('/auth/createTransactionToken/CM')
            .set('x-auth', SeedUsers[0].accessToken)
            .then((res) => {

                expect(res.status).toBe(404);
                expect(res.body.name).toBe('CouldNotFindTransaction');
                done();

            });
    });

    it('should create a transaction token and delete it', (done) => {

        let transactionToken;
        request(app)
            .get('/auth/createTransactionToken/UU')
            .set('x-auth', SeedUsers[0].accessToken)
            .then((res) => {

                if (res.error) {
                    console.log(res.error);
                }
                expect(res.body.transaction.id).toBe(SeedTransactions[0].id);
                expect(res.body.transaction.code).toBe(SeedTransactions[0].code);
                expect(res.body.transaction.method).toBe(SeedTransactions[0].method);
                expect(res.body.transaction.name).toBe(SeedTransactions[0].name);
                expect(res.body.transaction.desc).toBe(SeedTransactions[0].desc);
                expect(res.body.transaction.role.id).toBe(SeedRoles[2].id);
                expect(res.body.transaction.role.name).toBe(SeedRoles[2].name);
                expect(res.body.transaction.role.desc).toBe(SeedRoles[2].desc);
                expect(res.body.transaction.service.id).toBe(SeedServices[2].id);
                expect(res.body.transaction.service.domain).toBe(SeedServices[2].domain);
                expect(res.body.transactionToken.token).toBeDefined();
                transactionToken = res.body.transactionToken.token;

                request(app)
                    .delete('/auth/deleteTransactionToken/' + transactionToken)
                    .then((res) => {

                        if (res.error) {
                            console.log(res.error);
                        }

                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe('Destroyed transaction token');

                        return TransactionToken.findAll();

                    }).then((transactionTokens) => {

                    expect(transactionTokens.length).toBe(0);
                    done();

                });
            })
    });
});

function removeTransactionTokens(done) {
    TransactionToken.destroy({truncate: true}).then(() => {
            done();
        }
    )
}
