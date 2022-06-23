import {methods, roles} from "../config/enums";
import {v4} from 'uuid';
import sequelize from "../db/setup/db-mysql-setup";
import Role from "../db/role.model";
import Transaction from "../db/transaction.model";
import Service from "../db/service.model";
import jwt from "jsonwebtoken";
import User from "../db/user.model";


const roleOneId = v4();
const roleTwoId = v4();
const roleThreeId = v4();
const roleFourId = v4();
const roleFiveId = v4();
const roleSixId = v4();
const roleSevenId = v4();

export const SeedRoles = [{
    id: roleOneId.toString(),
    name: roles.deliverer,
    desc: 'Deliverer'
}, {
    id: roleTwoId.toString(),
    name: roles.restau,
    desc: 'Restaurant'
}, {
    id: roleThreeId.toString(),
    name: roles.client,
    desc: 'Client'
}, {
    id: roleFourId.toString(),
    name: roles.apiUser,
    desc: 'API user'
}, {
    id: roleFiveId.toString(),
    name: roles.extDev,
    desc: 'External developer'
}, {
    id: roleSixId.toString(),
    name: roles.commServ,
    desc: 'Commercial services'
}, {
    id: roleSevenId.toString(),
    name: roles.techServ,
    desc: 'Technical services'
},
]

export const PopulateRoles = (done) => {

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        return Role.destroy({truncate: true}).then(() => {
            // required for pre save middleware
            const saveMethods = [];

            for (const role of SeedRoles) {
                saveMethods.push((new Role(role)).save());
            }

            return Promise.all(saveMethods);
        });
    }).then(() => done());

}


const serviceOneId = v4();
const serviceTwoId = v4();
const serviceThreeId = v4();
const serviceFourId = v4();

export const SeedServices = [{
    id: serviceOneId.toString(),
    domain: 'orders'
}, {
    id: serviceTwoId.toString(),
    domain: 'restaurants'
}, {
    id: serviceThreeId.toString(),
    domain: 'users'
}, {
    id: serviceFourId.toString(),
    domain: 'deliveries'
}];

export const PopulateServices = (done) => {

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        return Service.destroy({truncate: true}).then(() => {
            // required for pre save middleware
            const saveMethods = [];

            for (const service of SeedServices) {
                saveMethods.push((new Service(service)).save());
            }

            return Promise.all(saveMethods);
        });
    }).then(() => done());
}

const transactionOneId = v4();
const transactionTwoId = v4();

export const SeedTransactions = [{
    id: transactionOneId.toString(),
    code: 'UU',
    method: methods.post,
    name: 'updateUser',
    desc: 'Update user',
    roleId: SeedRoles[2].id.toString(),
    serviceId: SeedServices[2].id.toString()
}, {
    id: transactionTwoId.toString(),
    code: 'CM',
    method: methods.post,
    name: 'createMenu',
    desc: 'Create menu',
    roleId: SeedRoles[1].id.toString(),
    serviceId: SeedServices[1].id.toString()
}]

export const PopulateTransactions = (done) => {

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        return Transaction.destroy({truncate: true}).then(() => {
            // required for pre save middleware
            const saveMethods = [];

            for (const transaction of SeedTransactions) {
                saveMethods.push((new Transaction(transaction)).save());
            }

            return Promise.all(saveMethods);
        });
    }).then(() => done());
}

const userOneId = v4();

export const SeedUsers = [{
    id: userOneId.toString(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: '123 Main St',
    phone: '+33606060606',
    password: '12345678',
    roleId: SeedRoles[2].id.toString(),
    accessToken: jwt.sign({
        id: userOneId.toString(),
        iat: Date.now() / 1000
    }, process.env.jwt_secret!, {expiresIn: '1h'}).toString(),
    refreshToken: jwt.sign({
        id: userOneId.toString(),
        iat: Date.now() / 1000
    }, process.env.jwt_secret!, {expiresIn: '48h'}).toString()
}];

export const PopulateUsers = (done) => {

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        return User.destroy({truncate: true}).then(() => {
            // required for pre save middleware
            const saveMethods = [];

            for (const user of SeedUsers) {
                saveMethods.push((new User(user)).save());
            }

            return Promise.all(saveMethods);
        });
    }).then(() => done());
}
