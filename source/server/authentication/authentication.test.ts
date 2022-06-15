import {ObjectId} from "mongodb";
import request from 'supertest';
import app from "../../server";
import {
    PopulateRestaurants,
    PopulateRoles,
    PopulateTransactions,
    PopulateTransactionTokens,
    SeedRestaurants,
    SeedTransactionTokens
} from "../seed-data";
import {Restaurant} from "../../db/user.model";

describe('POST /restaurant/register', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateTransactions);
    beforeEach(PopulateTransactionTokens);
    beforeEach(PopulateRestaurants);

    it('should create restaurant', (done) => {

        const restaurant = {
            email: 'StanIslasfoilLard@yahoO.com',
            password: 'azertyui',
            firstName: 'Stanislas',
            lastName: 'Foillard'
        }

        const clientInfo = {
            client: 'iOS',
            clientId: new ObjectId().toHexString()
        }

        request(app)
            .post('/restau/register')
            .set('trx-auth', SeedTransactionTokens[0].token)
            .send({restaurant, clientInfo})
            .expect(201)
            .expect((res) => {
                expect(res.body.data.restaurant.firstName).toBe(restaurant.firstName);
                expect(res.body.data.restaurant.lastName).toBe(restaurant.lastName);
                expect(res.body.data.restaurant.role).toStrictEqual(SeedRestaurants[0].role);
                expect(res.body.data.restaurant.email).toBe(restaurant.email.toLowerCase());
                expect(res.body.data.restaurant.password).not.toBe(restaurant.password);

            })
            .end((err) => {

                if (err) {
                    return done(err);
                }

                Restaurant.findOne({email: restaurant.email.toLowerCase()}).then((currentRestaurant) => {
                    expect(currentRestaurant).toBeTruthy();
                    done();
                }).catch((e) => {
                    done(e);
                })
                done();
            });
    });
});


describe('POST /restau/login', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateTransactions);
    beforeEach(PopulateTransactionTokens);
    beforeEach(PopulateRestaurants);

    it('should create and logged restaurant', (done) => {

        const restaurant = {
            email: 'StanIslasfoilLard@yahoO.com',
            password: 'azertyui',
            firstName: 'Stanislas',
            lastName: 'Foillard'
        }

        const clientInfo = {
            client: 'iOS',
            clientId: new ObjectId().toHexString()
        }

        request(app)
            .post('/restau/register')
            .set('trx-auth', SeedTransactionTokens[0].token)
            .send({restaurant, clientInfo})
            .expect(201)
            .then((res) => {

                if (res.error) {
                    console.log(res.error);
                }

                const signupAccessToken = res.body.data.tokens.accessToken;

                request(app)
                    .post('/restau/login')
                    .set('trx-auth', SeedTransactionTokens[1].token)
                    .send({
                        email: 'StanIslasfoilLard@yahoO.com',
                        password: 'azertyui',
                        client: clientInfo.client,
                        clientId: clientInfo.clientId
                    })
                    .then((res) => {

                        if (res.error) {
                            console.log(res.error);
                        }

                        expect(signupAccessToken).not.toBe(res.body.data.tokens.accessToken);

                        done();
                    });
            });
    });
});
