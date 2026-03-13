import pool from '$lib/server/database.js';

export async function GET({ params }) {

    const { id } = params;

    const [rows] = await pool.query(
        'SELECT * FROM waterfalls WHERE id = ?',
        [id]
    );

    if (rows.length === 0) {
        return Response.json({ message: 'Waterfall not found' }, { status: 404 });
    }

    return Response.json(rows[0], { status: 200 });
}