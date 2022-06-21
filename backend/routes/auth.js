"use strict";

/** Routes for authentication. */

const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const config = require('../config');
const userAuthSchema = require("../schemas/userAuth.json");

const User = require("../models/user");
const { BadRequestError } = require("../expressError");
const { authenticateJWT } = require('../middleware/auth');

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
        let { username } = await User.register( req.body );
        let token = jwt.sign({ username }, config.SECRET_KEY);
        return res.status(201).json({ token });
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400).json({ error: err.message });
        } else {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
});

router.post("/login", async function (req, res, next) {
    try {
        if (await User.authenticate(req.body.username, req.body.password)) {
            const username = req.body.username;
            const token = jwt.sign({ username }, config.SECRET_KEY);
            res.json({ token });
        } else {
            res.status(401).json({ error: "Invalid username/password" });
        }
    } catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

router.post("/auth", authenticateJWT, async function (req, res, next) {
    try {
        if (req.user) {
            return res.json({ user: req.user });
        } else {
            res.status(401).json({ error: "Unauthorized!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post("/token", async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userAuthSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }

      const { username, password } = req.body;
      const user = await User.authenticate(username, password);
      const token = createToken(user);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
