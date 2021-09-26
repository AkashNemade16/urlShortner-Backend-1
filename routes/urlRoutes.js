import express from 'express';
import { getUrl, createPost, getAllUrls, getUserUrls } from '../controllers/urlControllers.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/get', getAllUrls);
router.post('/create', createPost);
router.post('/users', getUserUrls);
router.get('/:id', getUrl);



export default router;