import request from 'supertest';
import app from "../../../server";
import {
    PopulateRoles,
    PopulateServices,
    PopulateTransactions,
    PopulateUsers,
    SeedRoles,
    SeedUsers
} from "../../seed-data";

/*
describe('POST /restaurant/register', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateServices)
    beforeEach(PopulateTransactions);
    beforeEach(PopulateUsers);

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

 */


describe('POST /auth/login', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateServices);
    beforeEach(PopulateUsers);
    beforeEach(PopulateTransactions);

    it('should logged user', (done) => {

        request(app)
            .post('/auth/login')
            .send({email: 'john@example.com', password: '12345678'})
            .then((res) => {

                if (res.error) {
                    console.log(res.error);
                }

                expect(res.body.user.id).toBe(SeedUsers[0].id);
                expect(res.body.user.email).toBe(SeedUsers[0].email);
                expect(res.body.user.firstName).toBe(SeedUsers[0].firstName);
                expect(res.body.user.lastName).toBe(SeedUsers[0].lastName);
                expect(res.body.user.address).toBe(SeedUsers[0].address);
                expect(res.body.user.phone).toBe(SeedUsers[0].phone);
                expect(res.body.user.password).not.toBeDefined();
                expect(res.body.user.accessToken).not.toBe(SeedUsers[0].accessToken);
                expect(res.body.user.refreshToken).not.toBe(SeedUsers[0].refreshToken);
                expect(res.body.user.role.id).toBe(SeedRoles[2].id);
                expect(res.body.user.role.name).toBe(SeedRoles[2].name);
                expect(res.body.user.role.desc).toBe(SeedRoles[2].desc);

                done();
            });
    });
});
