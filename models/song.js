"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Song {

    static async getSong(song_id) {
        const result = await db.query(
            `SELECT id, title, uri, artist, playlist, length, genre, viewed
            FROM songs
            WHERE id = $1`,
            [song_id]
        );
        const song = result.rows[0];
        console.log(song);

        if (!song) throw new NotFoundError(`No song: ${song_id}`);
        return song;
    }

    static async increasedViews(song_id) {
        const result = await db.query(
            `UPDATE songs
            SET viewed = viewed + 1
            WHERE id = ${song_id}
            RETURNING id, title, uri, artist, playlist, length, genre, viewed`
        )
        const song = result.rows[0];
        console.log(song)

        if (!song) throw new NotFoundError(`No song: ${song_id}`)
        return song;
    }

    static async getSongsInGenre(genre) {
        const result = await db.query(
            `SELECT id, title, uri, artist, playlist, length, genre, viewed
            FROM songs
            WHERE genre = $1`,
            [genre]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in ${genre}`)
        return songs;
    }

    static async getSongsInPlaylist(playlist_id) {
        const result = await db.query(
            `SELECT id, title, uri, artist, playlist, length, genre, viewed
            FROM songs
            WHERE playlist = $1`,
            [playlist_id]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in playlist ${playlist_id}`);
        return songs;
    }
}

module.exports = Song;