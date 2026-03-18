import pool from '$lib/server/database.js';
import { API_USER, API_PASS } from '$env/static/private';

function checkAuth(request) {
    // Get Authorization header from request
    const auth = request.headers.get('Authorization');

    // Check if header exists and starts with "Basic"
    if (!auth?.startsWith('Basic ')) return false;

    // Remove "Basic " and decode base64 string
    const base64 = auth.slice(6);
    const decoded = atob(base64);

    // Split into username and password
    const [user, pass] = decoded.split(':');

    // Compare with values from .env
    return user === API_USER && pass === API_PASS;
}

export async function GET({ params }) {

    // Get ID from URL
    const { id } = params;

    // Query database for a specific waterfall
    const [rows] = await pool.query(
        'SELECT * FROM waterfalls WHERE id = ?',
        [id]
    );

    // If no result found → return 404
    if (rows.length === 0) {
        return Response.json({ message: 'Waterfall not found' }, { status: 404 });
    }

    // Return waterfall data
    return Response.json(rows[0], { status: 200 });
}

export async function PUT({ params, request }) {

    // Check authentication
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get ID from URL
    const { id } = params;

    // Get updated data from request body
    const { name, location, type, height, accessibility, tourist_popularity } = await request.json();

    // Check required fields
    if (!name || !location || !type || !height) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Update waterfall in database
    const [result] = await pool.query(
        `UPDATE waterfalls 
        SET name = ?, location = ?, type = ?, height = ?, accessibility = ?, tourist_popularity = ?
        WHERE id = ?`,
        [name, location, type, height, accessibility, tourist_popularity, id]
    );

    // If no row was updated → waterfall not found
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Waterfall not found' }, { status: 404 });
    }

    // Return success message
    return Response.json({ message: 'Waterfall updated' }, { status: 200 });
}

export async function DELETE({ params, request }) {

    // Check authentication
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get ID from URL
    const { id } = params;

    // Delete waterfall from database
    const [result] = await pool.query(
        'DELETE FROM waterfalls WHERE id = ?',
        [id]
    );

    // If nothing was deleted → waterfall not found
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Waterfall not found' }, { status: 404 });
    }

    // Return success with no content
    return new Response(null, { status: 204 });
}