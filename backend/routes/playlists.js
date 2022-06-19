"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");

const Playlist = require("../models/playlist");
const playlistNewSchema = require("../schemas/playlistNew.json");
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth')

router.post("/create", authenticateJWT, async function (req, res, next) {
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

router.post("/:playlist_id/add/:song_id", authenticateJWT, async function (req, res, next) {
    try {
        const playlist_id = req.params.playlist_id;
        const song_id = req.params.song_id;
        const playlist = await Playlist.addSong(playlist_id, song_id);
        return res.status(201).json({ playlist });
    } catch (err) {
        return next(err);
    }
});

router.get("/:playlist_id", async function (req, res, next) {
    try {
        const playlist_id = req.params.playlist_id;
        const playlist = await Playlist.getPlaylist(playlist_id);
        return res.json({ playlist });
    } catch (err) {
        return next(err);
    }
});

router.get("/", async function (req, res, next) {
    try {
        const playlist = await Playlist.getAllPlaylist();
        return res.json({ playlist });
    } catch (err) {
        return next(err);
    }
});

router.get("/user/:username", async function (req, res, next) {
    try {
        const username = req.params.username;
        const playlist = await Playlist.getAllPlaylistByUser(username);
        return res.json({ playlist });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
