"use strict";

const bcrypt = require("bcrypt");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const db = require("../db");
const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError
} = require("../expressError");

class User {
    static authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT `
        )
    }
}
