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
import User from "../../../db/user.model";
import DoneCallback = jest.DoneCallback;


describe('POST /auth/register', () => {

    beforeEach(PopulateRoles);
    beforeEach(PopulateServices);
    beforeEach(PopulateTransactions);
    beforeEach(removeUsers);

    it('Should return an error for a missing first name', (done) => {

        const user = {
            lastName: 'Doe',
            email: 'jOhn@Example.com',
            address: '123 Main St',
            phone: '+33606060606',
            password: '12345678'
        };
        request(app)
            .post('/auth/register')
            .send(user)
            .then((res) => {

                expect(res.status).toBe(400);
                expect(res.body.name).toBe('NoFirstNameFound');

                done();
            });
    });


    it('Should return an error for invalid email', (done) => {

        const user = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jOhnx$&_/&é"!:*$@Example.com',
            address: '123 Main St',
            phone: '+33606060606',
            password: '12345678'
        };
        request(app)
            .post('/auth/register')
            .send(user)
            .then((res) => {

                expect(res.status).toBe(400);
                expect(res.body[0].name).toBe('SequelizeError Validation error');

                done();
            });
    });

    it('should register user', (done) => {

        const user = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jOhn@Example.com',
            address: '123 Main St',
            phone: '+33606060606',
            password: '12345678'
        };
        request(app)
            .post('/auth/register')
            .send(user)
            .then((res) => {

                if (res.error) {
                    console.log(res.error);
                }

                expect(res.body.user.id).toBeDefined();
                expect(res.body.user.firstName).toBe('John');
                expect(res.body.user.lastName).toBe('Doe');
                expect(res.body.user.email).toBe('john@example.com');
                expect(res.body.user.address).toBe('123 Main St');
                expect(res.body.user.phone).toBe('+33606060606');
                expect(res.body.user.password).not.toBeDefined();
                expect(res.body.user.accessToken).toBeDefined();
                expect(res.body.user.refreshToken).not.toBeDefined();

                expect(res.body.user.role.id).toBe(SeedRoles[2].id);
                expect(res.body.user.role.name).toBe(SeedRoles[2].name);
                expect(res.body.user.role.desc).toBe(SeedRoles[2].desc);

                done();
            });
    });
});


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
                expect(res.body.user.firstName).toBe(SeedUsers[0].firstName);
                expect(res.body.user.lastName).toBe(SeedUsers[0].lastName);
                expect(res.body.user.email).toBe(SeedUsers[0].email);
                expect(res.body.user.address).toBe(SeedUsers[0].address);
                expect(res.body.user.phone).toBe(SeedUsers[0].phone);
                expect(res.body.user.password).not.toBeDefined();
                expect(res.body.user.role.desc).toBe(SeedRoles[2].desc);
                expect(res.body.user.accessToken).toBeDefined();
                expect(res.body.user.refreshToken).not.toBeDefined();

                expect(res.body.user.role.id).toBe(SeedRoles[2].id);
                expect(res.body.user.role.name).toBe(SeedRoles[2].name);

                done();
            });
    });
});


function removeUsers(done: DoneCallback) {
    User.destroy({truncate: true}).then(() => {
            done();
        }
    )
}
