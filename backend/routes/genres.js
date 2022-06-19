"use strict";

const express = require("express");
const router = express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { authenticateJWT } = require('../middleware/auth')
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

router.post("/create", async function (req, res, next) {
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
});

router.post("/:genre_id/add/:song_id", authenticateJWT, async function (req, res, next) {
    try {
        const genre_id = req.params.genre_id;
        const song_id = req.params.song_id;
        const genre = await Genre.addSong(song_id, genre_id);
        return res.status(201).json({ genre });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
