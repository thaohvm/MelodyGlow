"use strict";

const db = require("../db.js");
const Song = require("./song.js");

const { NotFoundError } = require("../expressError");
const testSongIds = [];

beforeEach(async () => {
    await db.query("DELETE FROM songs");
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

    console.log(songResults.rows[0]);
    testSongIds.splice(0, 0, ...songResults.rows.map(r => r.id));
    console.log(testSongIds);
})

afterAll(async () => {
    await db.end();
})

/************************************** getSong */

describe("getSong", function () {
    test("can get detail of the song based on song_id ", async function () {
        let song = await Song.getSong(testSongIds[0]);
        expect(song).toEqual({
            id: testSongIds[0],
            title: "title1",
            uri: "uri1",
            artist: "anonymous1",
            playlist: "playlist1",
            length: "3:00",
            genre: "genre1",
            viewed: 200
        });
    });

    test("throw Not Found Error if the song is not exist ", async function () {
        try {
            await Song.getSong(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** increased viewed */

describe("increased viewed", function () {
    test("can increase the viewed of the song by 1", async function () {
        let song = await Song.increasedViews(testSongIds[0]);
        expect(song).toEqual({
            id: testSongIds[0],
            title: "title1",
            uri: "uri1",
            artist: "anonymous1",
            playlist: "playlist1",
            length: "3:00",
            genre: "genre1",
            viewed: 201
        });
    });

    test("throw Not Found Error if the song is not exist ", async function () {
        try {
            await Song.increasedViews(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** getSongInGenre */

describe("getSongInGenre", function () {
    test("can list the songs which are in a particular genre", async function () {
        let song = await Song.getSongsInGenre("genre1");
        expect(song).toEqual([
            {
                id: testSongIds[0],
                title: "title1",
                uri: "uri1",
                artist: "anonymous1",
                playlist: "playlist1",
                length: "3:00",
                genre: "genre1",
                viewed: 200
            }
        ]);
    });

    test("throw Not Found Error if the genre is not exist ", async function () {
        try {
            const song = await Song.getSongsInGenre("nope");
            console.log(song)
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** getSongInPlaylist */

describe("getSongInPlaylist", function () {
    test("can list the songs which are in a particular playlist", async function () {
        let song = await Song.getSongsInPlaylist("playlist1");
        expect(song).toEqual([
            {
                id: testSongIds[0],
                title: "title1",
                uri: "uri1",
                artist: "anonymous1",
                playlist: "playlist1",
                length: "3:00",
                genre: "genre1",
                viewed: 200
            }
        ]);
    });

    test("throw Not Found Error if the playlist is not exist ", async function () {
        try {
            const song = await Song.getSongsInPlaylist("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
