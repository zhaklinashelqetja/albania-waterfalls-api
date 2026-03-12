import pool from '$lib/server/database.js';

function checkAuth(request) {
    const auth = request.headers.get('authorization');

    if (!auth || !auth.startsWith('Basic ')) {
        return false;
    }

    const [user, pass] = atob(auth.split(' ')[1]).split(':');

    return user === 'admin' && pass === 'albania2024';
}


export async function GET() {
    const [rows] = await pool.query('SELECT * FROM waterfalls');

    return Response.json(rows, { status: 200 });
}


export async function POST({ request }) {

    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, location, type, height, accessibility, tourist_popularity } = await request.json();

    if (!name || !location || !type) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
        `INSERT INTO waterfalls 
        (name, location, type, height, accessibility, tourist_popularity)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, location, type, height, accessibility, tourist_popularity]
    );

    return Response.json(
        { message: 'Waterfall created', id: result.insertId },
        { status: 201 }
    );
}