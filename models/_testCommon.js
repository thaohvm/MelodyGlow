// const db = require("../db.js");
// const { BCRYPT_WORK_FACTOR } = require("../config");

// const testPlaylistIds = [];
// const testSongIds = [];
// const testGenreIds = [];

// async function commonBeforeAll() {

//     await db.query("DELETE FROM users");
//     await db.query("DELETE FROM songs");
//     await db.query("DELETE FROM playlists");

//     await db.query(`
//         INSERT INTO users(username,
//                   password,
//                   email,
//                   location)
//         VALUES ('u1', $1, 'u1@email.com','US')
//             ('u2', $2, 'u2@email.com','Canada')
//         RETURNING username`,
//         [
//             await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
//             await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
//         ]);

//     const resultsPlaylists = await db.query(`
//         INSERT INTO playlists(name, image_url, username)
//         VALUES ('playlist1','http://p1.img','u1'),
//             ('playlist2','http://p2.img','u2')
//         RETURNING id`);
//     testPlaylistIds.splice(0, 0, ...resultsPlaylists.rows.map(r => r.id));

//     const resultsSongs = await db.query(`
//         INSERT INTO songs (title,
//             uri,
//             artist,
//             playlist,
//             length,
//             genre,
//             viewed)
//         VALUES ('title1', 'uri1', 'anonymous1','playlist1', '3:00','genre1','200'),
//             ('title2', 'uri2', 'anonymous2','playlist2','2:00','genre2','200')
//         RETURNING id`);
//     testSongIds.splice(0, 0, ...resultsSongs.rows.map(r => r.id));

//     const resultsGenres = await db.query(`
//     INSERT INTO playlists(name, image_url, username)
//     VALUES ('playlist1','http://p1.img','u1'),
//         ('playlist2','http://p2.img','u2')
//     RETURNING id`);
//     testGenreIds.splice(0, 0, ...resultsGenres.rows.map(r => r.id));

//     await db.query(`
//         INSERT INTO applications(username, job_id)
//         VALUES ('u1', $1)`,
//         [testJobIds[0]]);
// }

// async function commonBeforeEach() {
//     await db.query("BEGIN");
// }

// async function commonAfterEach() {
//     await db.query("ROLLBACK");
// }

// async function commonAfterAll() {
//     await db.end();
// }


// module.exports = {
//     commonBeforeAll,
//     commonBeforeEach,
//     commonAfterEach,
//     commonAfterAll,
//     testJobIds,
// };
