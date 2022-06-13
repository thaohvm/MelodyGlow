"use strict";

const express = require("express");

const Song = require("../models/song");
const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const songs = await Song.getSong();
        return res.json({ songs })
    } catch (e) {
        return next(e);
    }
});

router.post("/:song_id/viewed", async function (req, res, next) {
    try {
        const song_id = req.params.song_id;
        const song = await Song.increasedViews(song_id);
        return res.json({ song })
    } catch (e) {
        return next(e);
    }
});

router.get("/:genre", async function (req, res, next) {
    try {
        const genre = req.params.genre;
        const songs = await Song.getSongsInGenre(genre);
        return res.json({ songs })
    } catch (e) {
        return next(e);
    }
});

router.get("/:playlist", async function (req, res, next) {
    try {
        const playlist = req.params.playlist;
        const songs = await Song.getSongsInGenre(playlist);
        return res.json({ songs })
    } catch (e) {
        return next(e);
    }
});
