import express from 'express';
import { getUsers, registerUsers, validateUsers } from '../controllers/authControllers.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', registerUsers);
router.post('/login', validateUsers);
router.get('/getuser', auth, getUsers)


export default router;