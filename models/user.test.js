"use strict";
const bcrypt = require("bcrypt");

const db = require("../db.js");
const User = require("./user.js")

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

beforeEach(async () => {
    await db.query("DELETE FROM users");
    await db.query(`
    INSERT INTO users(username,
                    password,
                    email,
                    location)
    VALUES ('u1', $1, 'u1@email.com','US')
    RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        ]);
})

afterAll(async () => {
    await db.end();
})

/************************************** authenticate */

describe("authenticate", function () {
    test("can authenticate valid account ", async function () {
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual({
            username: "u1",
            email: "u1@email.com",
            location: "US"
        });
    });

    test("unauth if no such user", async function () {
        try {
            await User.authenticate("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });

    test("unauth if wrong password", async function () {
        try {
            await User.authenticate("c1", "wrong");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/************************************** register */

describe("register", function () {
    const newUser = {
        username: "u2",
        email: "u2@test.com",
        location: "Canada"
    };

    test("should register with valid input", async function () {
        let user = await User.register({
            ...newUser,
            password: "password2",
        });
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'u2'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("should return bad request with duplicated data", async function () {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("should return list of all users info", async function () {
        const users = await User.findAll();
        expect(users).toEqual([
            {
                username: "u1",
                email: "u1@email.com",
                location: "US",
            },
        ]);
    });
});
