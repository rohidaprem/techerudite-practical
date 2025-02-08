const { Sequelize } = require("sequelize");
require("dotenv").config();

const createSequelizeInstance = () => {
    try {
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: "mysql",
            logging: false,
        });

        return sequelize;
    } catch (error) {
        throw new Error("Database configuration not found.");
    }
};

module.exports = createSequelizeInstance;
