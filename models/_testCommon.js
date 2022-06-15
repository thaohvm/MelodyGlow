const db = require("../db.js");
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require("../config");

const testPlaylistIds = [];
const testSongIds = [];
const testGenreIds = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM users_songs");
    await db.query("DELETE FROM playlists_songs");
    await db.query("DELETE FROM songs_genres");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM songs");
    await db.query("DELETE FROM genres");

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

    const resultsPlaylists = await db.query(`
        INSERT INTO playlists(name, image_url, username)
        VALUES ('playlist1','http://p1.img','u1'),
            ('playlist2','http://p2.img','u2')
        RETURNING id`);
    testPlaylistIds.splice(0, 0, ...resultsPlaylists.rows.map(r => r.id));

    const resultsSongs = await db.query(`
        INSERT INTO songs (title,
            uri,
            artist,
            length,
            viewed)
        VALUES ('title1', 'uri1', 'anonymous1', '3:00','200'),
            ('title2', 'uri2', 'anonymous2','2:00','200')
        RETURNING id`);
    testSongIds.splice(0, 0, ...resultsSongs.rows.map(r => r.id));

    const resultsGenres = await db.query(`
        INSERT INTO genres(name)
        VALUES ('genre1'),
            ('genre2')
        RETURNING id`);
    testGenreIds.splice(0, 0, ...resultsGenres.rows.map(r => r.id));

    await db.query(`
        INSERT INTO playlists_songs(song_id, playlist_id)
        VALUES ($1, $2)
        RETURNING id, song_id, playlist_id`,
    [testSongIds[0], testPlaylistIds[0]]);

    await db.query(`
        INSERT INTO songs_genres(song_id, genre_id)
        VALUES ($1, $2)
        RETURNING id, song_id, genre_id`,
    [testSongIds[0], testGenreIds[0]]);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testSongIds,
    testPlaylistIds,
    testGenreIds
};
