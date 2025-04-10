// routes/photoRoutes.js
import express from 'express';
import { handlePhotoUpload } from '../controllers/photoController.js';

const router = express.Router();

router.post('/photo', handlePhotoUpload);

export default router;
