import express from 'express';
import signUp from '../controller/Onbording/signUp.js';
import login from '../controller/Onbording/login.js';



const router = express.Router();

router.post('/signUp',signUp)
router.post('/login',login)


export default router;
