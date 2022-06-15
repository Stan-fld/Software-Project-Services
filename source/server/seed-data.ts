import {reqCat, roles} from "../config/enums";
import {v4} from 'uuid';
import sequelize from "../db/setup/db-mysql-setup";
import Role from "../db/role.model";
import Transaction from "../db/transaction.model";


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
    desc: 'Commercial service'
}, {
    id: roleSevenId.toString(),
    name: roles.techServ,
    desc: 'Technical service'
},
]

export const PopulateRoles = (done) => {

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        Role.destroy({truncate: true}).then(() => {
            // required for pre save middleware
            const saveMethods = [];

            for (const role of SeedRoles) {
                saveMethods.push((new Role(role)).save());
            }

            return Promise.all(saveMethods);
        });
    }).then(() => done());

}


const transactionOneId = v4();
const transactionTwoId = v4();
const transactionThreeId = v4();

export const SeedTransactions = [{
    id: transactionOneId.toString(),
    code: 'CR',
    reqCat: reqCat.post,
    desc: 'Create restaurant',
    roleId: SeedRoles[0].id.toString()
}, {
    id: transactionTwoId.toString(),
    code: 'CCL',
    reqCat: reqCat.post,
    desc: 'Create client',
    roleId: SeedRoles[2].id.toString()
}, {
    id: transactionThreeId.toString(),
    code: 'Login',
    reqCat: reqCat.post,
    desc: 'Login users',
    roleId: SeedRoles[1].id.toString()
}]

export const PopulateTransactions = (done) => {

    Transaction.destroy({truncate: true}).then(() => {
        // required for pre save middleware
        const saveMethods = [];

        for (const transaction of SeedTransactions) {
            saveMethods.push((new Transaction(transaction)).save());
        }

        return Promise.all(saveMethods);
    }).then(() => done())

}
