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

module.exports = router;
