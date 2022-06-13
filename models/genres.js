"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Genre {
    /**
     *
     * data should be { user_id, name, image_url }
     */

    static async getAll() {
        const result = await db.query(
            `SELECT name
            FROM genres
            ORDER BY name`
        );
        return result.rows;
    }
}

module.exports = Genre;
