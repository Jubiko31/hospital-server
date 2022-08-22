/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { Sequelize, sequelize } = require('sequelize');

const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
const connect = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  poll: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

const auth = async () => {
  try {
    await connect.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

auth();

module.exports = { connect, Sequelize };
