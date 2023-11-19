// const {
//   DB_USERNAME = "postgres",
//   DB_PASSWORD = "admin",
//   DB_NAME = "db_car_rental_development",
//   DB_HOST = "127.0.0.1",
// } = process.env;

// module.exports = {
//   development: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
//   test: {
//     username: "root",
//     password: null,
//     database: "database_test",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
//   production: {
//     username: "root",
//     password: null,
//     database: "database_production",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
// };

const { Pool } = require('pg');

const pool = new Pool({
    username: "postgres",
    password: "admin",
    database: "db_car_rental_development",
    host: "localhost",
    port: 5432,
});

module.exports = pool;