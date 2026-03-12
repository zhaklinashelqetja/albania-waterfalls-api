import { json } from '@sveltejs/kit';
import pool from '$lib/db.js';

export async function GET() {
    const [rows] = await pool.query("SELECT * FROM waterfalls");
    return json(rows);
}