"use strict";

const express = require("express");

const Genre = require("../models/genres");
const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const genres = await Genre.getAll();
        return res.json({ genres })
    } catch (e) {
        return next(e);
    }
})
