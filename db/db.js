require('dotenv').config()

const { Sequelize } = require('sequelize')
console.log(process.env.DB_NAME)

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }

)

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    // Other options
});

module.exports = sequelize;
