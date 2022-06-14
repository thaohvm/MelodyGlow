"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");

const Playlist = require("../models/playlist");
const playlistNewSchema = require("../schemas/playlistNew.json");
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth')

router.post("/", authenticateJWT, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, playlistNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const playlist = await Playlist.create(req.body);
        return res.status(201).json({ playlist });
    } catch (err) {
        return next(err);
    }
});

router.post("/add/:song_id", authenticateJWT, async function (req, res, next) {
    try {
        const song_id = req.params.song_id;
        const playlist = await Playlist.addSong(song_id);
        return res.status(201).json({ playlist });
    } catch (err) {
        return next(err);
    }
});

router.get("/:playlist_id", async function (req, res, next) {
    try {
        const playlist_id = req.params.playlist_id;
        const playlist = await Playlist(playlist_id);
        return res.json({ playlist });
    } catch (err) {
        return next(err);
    }
});