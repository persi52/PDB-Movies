const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "zaq1@WSX",
    host: "localhost",
    port: 5433,
    database: "imaginaris"
});

module.exports = pool;