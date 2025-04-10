// routes/pageRoutes.js
import express from 'express';
import { getAboutInfo, getHomeInfo } from '../controllers/pageController.js';

const router = express.Router();

router.get('/about', getAboutInfo);
router.get('/home', getHomeInfo);

export default router;
