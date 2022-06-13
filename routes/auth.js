"use strict";

/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();

const { BadRequestError } = require("../expressError");

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        let { username } = await User.register(req.body.username, req.body.password);
        let token = jwt.sign({ username }, config.db.SECRET_KEY);
        return res.json({ token });
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400);
            res.json({ error: err.message });
        } else {
            res.status(500);
            res.json({ error: err.message });
        }
    }
});

router.post("/login", async function (req, res, next) {
    try {
        if (await User.authenticate(req.body.username, req.body.password)) {
            const username = req.body.username;
            const token = jwt.sign({ username }, config.db.SECRET_KEY);
            res.json({ token });
        } else {
            res.status(401);
            res.json({ error: "Invalid username/password" });
        }
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400);
            res.json({ error: err.message });
        } else {
            res.status(500);
            res.json({ error: err.message });
        }
    }
});

router.post("/auth", authenticateJWT, async function (req, res, next) {
    try {
        if (req.user) {
            return res.json({ user: req.user });
        } else {
            res.status(401);
            res.json({ error: "Unauthorized!" });
        }
    } catch (err) {
        res.status(500);
        res.json({ error: err.message })
    }
});

module.exports = router;
