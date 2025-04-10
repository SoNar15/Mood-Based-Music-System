import express from 'express';
import { getSongsByMood, getAllSongs } from '../controllers/songController.js';

const router = express.Router();

router.get('/', getAllSongs);            // for /api/songs
router.get('/:mood', getSongsByMood);    // for /api/songs/happy

export default router;
