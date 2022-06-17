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

    testPlaylistIds[0] = (await Playlist.create(
        {
            username: "u1",
            name: "playlist1",
            image_url: "http://p1.img"
        })).id;

    testPlaylistIds[1] = (await Playlist.create(
        {
            username: "u2",
            name: "playlist2",
            image_url: "http://p2.img"
        })).id;

    testGenreIds[0] = (await Genre.create(
        {
            name: "genre1"
        })).id;

    testGenreIds[1] = (await Genre.create(
        {
            name: "genre2"
        })).id;

    testSongIds[0] = (await Song.create(
        {
            title: "title1",
            uri: "uri1",
            artist: "anonymous1",
            length: "3:00",
            viewed: 200
        })).id;

    testSongIds[1] = (await Song.create(
        {
            title: "title2",
            uri: "uri2",
            artist: "anonymous2",
            length: "2:00",
            viewed: 200
        })).id;

    await Playlist.addSong(testPlaylistIds[0], testSongIds[0]);
    await Playlist.addSong(testPlaylistIds[0], testSongIds[1]);
    await Genre.addSong(testSongIds[0], testGenreIds[0]);
    await Genre.addSong(testSongIds[1], testGenreIds[0]);
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
