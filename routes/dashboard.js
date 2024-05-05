import express from 'express';
import signUp from '../controller/signUp.js';
import login from '../controller/login.js';


const router = express.Router();

router.post('/signUp',signUp)
router.post('/login',login)

export default router;
