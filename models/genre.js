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
            `SELECT id, name
            FROM genres
            ORDER BY name`
        );
        if (result.rows.length === 0) throw new NotFoundError (`No genre exist`);
        return result.rows;
    }

    static async create({ name }) {
        const result = await db.query(
            `INSERT INTO genres
            (name)
            VALUES ($1)
            RETURNING id, name`, [name]
        );
        if (result.rows.length === 0) throw new NotFoundError (`No genre exist: ${name}`)
        return result.rows[0];
    }
}

module.exports = Genre;
