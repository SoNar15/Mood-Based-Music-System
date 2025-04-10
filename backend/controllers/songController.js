import pool from '../models/db.js';

export const getSongsByMood = async (req, res) => {
  const mood = req.params.mood;
  try {
    const result = await pool.query('SELECT * FROM songs WHERE mood = $1', [mood]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching songs.' });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM songs');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching all songs.' });
  }
};
