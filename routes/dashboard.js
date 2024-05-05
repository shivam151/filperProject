import express from 'express';
import signUp from '../controller/signUp.js';







const router = express.Router();

router.post('/signUp',signUp)

export default router;
