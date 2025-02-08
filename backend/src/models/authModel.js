const { DataTypes } = require("sequelize");
const createSequelizeInstance = require("../middlewares/connection");

// Initialize Sequelize instance
const sequelize = createSequelizeInstance();

const AuthModel = sequelize.define('Auth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    // emailOTP: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
}, {
    tableName: 'auth', // Explicitly define the table name
    timestamps: true, // Enable timestamps for `createdAt` and `updatedAt`
    createdAt: 'createdAt', // Customize the column names for timestamps
    updatedAt: 'updatedAt', // Customize the column names for timestamps
    underscored: false,
});

// Sync the model with the database (creates the table if it doesn't exist)
sequelize.sync()
    .then(() => {
        console.log('Auth table created successfully!');
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    });

module.exports = AuthModel;
