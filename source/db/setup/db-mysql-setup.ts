import {Dialect, Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect as Dialect,
    logging: false
});

export default sequelize;
