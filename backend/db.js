const pg = require("pg");

const db = new pg.Client("postgresql:///melody");

db.connect();

module.exports = db;
