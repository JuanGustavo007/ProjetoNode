const { DataTypes } = require("sequelize");
const connection = require("./database");

const Login = connection.define("Login", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
Login.sync({ force: false }).then(() => {});

module.exports = Login;
