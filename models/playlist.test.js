"use strict";

const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const db = require("../db.js");
const Playlist = require("./playlist.js");
const User = require("./user.js");

const { NotFoundError } = require("../expressError");
const testPlaylistIds = [];
const testSongIds = [];

beforeEach(async () => {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM songs");

    await db.query(`
        INSERT INTO users(username,
                      password,
                      email,
                      location)
        VALUES ('u1', $1, 'u1@email.com','US'),
            ('u2', $2, 'u2@email.com','Canada')
        RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        ]);

    const playlistResults = await db.query(`
        INSERT INTO playlists(username,
                    name,
                    image_url)
        VALUES ('u1','playlist1','http://p1.img'),
            ('u2','playlist2','http://p2.img')
        RETURNING id, username, name, image_url`);
    testPlaylistIds.splice(0, 0, ...playlistResults.rows.map(r => r.id));

    const songResults = await db.query(`
    INSERT INTO songs(title,
                    uri,
                    artist,
                    playlist,
                    length,
                    genre,
                    viewed)
    VALUES ('title1', 'uri1', 'anonymous1','playlist1', '3:00','genre1','200'),
    ('title2', 'uri2', 'anonymous2','playlist2','2:00','genre2','200')
    RETURNING id, title, uri, artist, playlist, length, genre, viewed`);
    testSongIds.splice(0, 0, ...songResults.rows.map(r => r.id));

})

afterAll(async () => {
    await db.end();
})

/************************************** create */

describe("create", function () {
    test("can create a new playlist", async function () {
        let newPlaylist = await Playlist.create({ username: 'u1', name: 'playlist3', image_url: 'http://p3.img' });
        expect(newPlaylist).toEqual({
            id: expect.any(Number),
            username: "u1",
            name: "playlist3",
            image_url: "http://p3.img"
        });
    });
});

/************************************** addSong */

// describe("addSong", function () {
//     test("can add songs to playlist", async function () {
//         let songsInPlaylist = await Playlist.addSong({ playlist_id: testPlaylistIds[0], song_id: testSongIds[0] });
//         expect(playlist).toEqual({
//             song_id: ,
//             playlist_id:
//         });
//     });
// });
