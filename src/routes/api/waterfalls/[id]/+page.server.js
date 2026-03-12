import { json } from '@sveltejs/kit';
import pool from '$lib/db.js';

export async function GET({ params }) {
    const { id } = params;

    const [rows] = await pool.query(
        "SELECT * FROM waterfalls WHERE id = ?",
        [id]
    );

    if (rows.length === 0) {
        return json({ error: "Not found" }, { status: 404 });
    }

    return json(rows[0]);
}