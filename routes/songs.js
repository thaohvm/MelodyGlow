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

router.put("/:song_id/viewed", async function (req, res, next) {
    try {
        const song_id = req.params.song_id;
        const song = await Song.increasedViews(song_id);
        return res.json({ song })
    } catch (e) {
        return next(e);
    }
});

router.get("/:genre_id", async function (req, res, next) {
    try {
        const genre_id = req.params.genre_id;
        const songs = await Song.getSongsInGenre(genre_id);
        return res.json({ songs })
    } catch (e) {
        return next(e);
    }
});

router.get("/:playlist_id", async function (req, res, next) {
    try {
        const playlist_id = req.params.playlist;
        const songs = await Song.getSongsInPlaylist(playlist_id);
        return res.json({ songs })
    } catch (e) {
        return next(e);
    }
});
