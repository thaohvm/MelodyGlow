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
    /** authenticate user with username, password.
     *
     * Returns { username, email, location }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/
    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                      password,
                      email,
                      location
               FROM users
               WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
   *
   * Returns { username, email, location }
   *
   * Throws BadRequestError on duplicates.
   **/

    static async register(
        { username, password, email, location }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
            (username,
            password,
            email,
            location)
            VALUES ($1, $2, $3, $4)
            RETURNING username, email, location`,
            [
                username,
                hashedPassword,
                email,
                location
            ],
        );

        const user = result.rows[0];

        return user;
    }

    static async findAll() {
        const result = await db.query(
            `SELECT username,
                    email,
                    location
               FROM users
               ORDER BY username`,
        );
        return result.rows;
    }

    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                    email,
                    location
               FROM users
               WHERE username = $1`,
            [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        return user;
    }
}

module.exports = User;
