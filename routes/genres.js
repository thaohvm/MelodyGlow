"use strict";

const express = require("express");
const router = express.Router();

const Genre = require("../models/genre");
const genreNewSchema = require("../schemas/genreNew.json");

router.get("/", async function (req, res, next) {
    try {
        const genres = await Genre.getAll();
        return res.json({ genres })
    } catch (e) {
        return next(e);
    }
});

router.get("/create", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, genreNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newGenre = await Genre.create(req.body);
        return res.status(201).json({ newGenre });
    } catch (err) {
        return next(err);
    }
})
