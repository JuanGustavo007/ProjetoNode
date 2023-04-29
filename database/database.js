const Sequelize = require("sequelize");

const conection = new Sequelize("blog", "root", "loop170414", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = conection;
