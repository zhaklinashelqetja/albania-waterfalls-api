import pool from '$lib/server/database.js';
import { API_USER, API_PASS } from '$env/static/private';


// Function to check Basic Authentication
function checkAuth(request) {
    // Get Authorization header from request
    const auth = request.headers.get('Authorization');

    // Check if header exists and starts with "Basic"
    if (!auth?.startsWith('Basic ')) return false;

    // Extract base64 part and decode it
    const base64 = auth.slice(6);
    const decoded = atob(base64);

    // Split username and password
    const [user, pass] = decoded.split(':');

    // Compare with values from .env file
    return user === API_USER && pass === API_PASS;
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

    if (!name || !location || !type || !height) {
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