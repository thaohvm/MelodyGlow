"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Song = require("../models/song");
const Playlist = require("../models/playlist");
const Genre = require("../models/genre");
const { createToken } = require("../helpers/tokens");

const testSongIds = [];
const testPlaylistIds = [];
const testGenreIds = [];

async function commonBeforeAll() {

    await db.query("DELETE FROM users_songs");
    await db.query("DELETE FROM playlists_songs");
    await db.query("DELETE FROM songs_genres");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM songs");
    await db.query("DELETE FROM genres");

    testPlaylistIds[0] = await Playlist.create(
        {
            username: "u1",
            name: "playlist1",
            image_url: "http://p1.img"
        });

    testPlaylistIds[1] = await Playlist.create(
        {
            username: "u2",
            name: "playlist2",
            image_url: "http://p2.img"
        });

    testGenreIds[0] = await Genre.create(
        {
            name: "genre1"
        });

    testGenreIds[1] = await Genre.create(
        {
            name: "genre2"
        });

    testSongIds[0] = await Song.create(
        {
            title: "title1",
            uri: "uri1",
            artist: "artist1",
            length: "3:00",
            viewed: 200
        });

    testSongIds[1] = await Song.create(
        {
            title: "title2",
            uri: "uri2",
            artist: "artist2",
            length: "3:00",
            viewed: 200
        });

    await User.register({
        username: "u1",
        email: "user1@user.com",
        password: "password1",
        location: "US"
    });
    await User.register({
        username: "u2",
        email: "user2@user.com",
        password: "password2",
        location: "Canada"
    });
}
//
async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testGenreIds,
    testPlaylistIds,
    testSongIds,
    u1Token,
    u2Token,
};
