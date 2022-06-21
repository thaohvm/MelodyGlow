"use strict";

const express = require("express");

const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users })
    } catch (e) {
        return next(e);
    }
})

router.get("/:username", authenticateJWT, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
