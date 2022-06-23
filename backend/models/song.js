"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Song {

    static async getAllSong() {
        const result = await db.query(
            `SELECT id, title, uri, artist, length, viewed
            FROM songs
            ORDER BY title`,
        );
        const songs = result.rows;

        if (!songs) throw new NotFoundError(`No song available`);
        return songs;
    }

    static async getSong(song_id) {
        const result = await db.query(
            `SELECT id, title, uri, artist, length, viewed
            FROM songs
            WHERE id = $1`,
            [song_id]
        );
        const song = result.rows[0];
        console.log(song);

        if (!song) throw new NotFoundError(`No song: ${song_id}`);
        return song;
    }

    static async create({ title, uri, artist, length, viewed }) {
        const result = await db.query(
            `INSERT INTO songs
            (title, uri, artist, length, viewed)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, uri, artist, length, viewed`,
            [title, uri, artist, length, viewed]
        );
        if (result.rows.length === 0) throw new NotFoundError(`No song exist: ${title}`)
        return result.rows[0];
    }

    static async increasedViews(song_id) {
        const result = await db.query(
            `UPDATE songs
            SET viewed = viewed + 1
            WHERE id = ${song_id}
            RETURNING id, title, uri, artist, length, viewed`
        )
        const song = result.rows[0];
        console.log(song)

        if (!song) throw new NotFoundError(`No song: ${song_id}`)
        return song;
    }

    static async getSongsInGenre(genre_id) {
        const result = await db.query(
            `SELECT songs.id, songs.title, songs.uri, songs.artist, songs.length, songs.viewed
             FROM songs
             INNER JOIN songs_genres
               ON songs.id = songs_genres.song_id
               AND songs_genres.genre_id = $1`,
            [genre_id]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in ${genre_id}`)
        return songs;
    }

    static async getSongsInPlaylist(playlist_id) {
        const result = await db.query(
            `SELECT songs.id, songs.title, songs.uri, songs.artist, songs.length, songs.viewed
             FROM songs
             INNER JOIN playlists_songs
               ON songs.id = playlists_songs.song_id
               AND playlists_songs.playlist_id = $1`,
            [playlist_id]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in playlist ${playlist_id}`);
        return songs;
    }
}

module.exports = Song;
