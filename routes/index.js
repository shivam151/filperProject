import express from 'express';
const app = express.Router();


import dashboard from './dashboard.js'
import onbording from './onbording.js'



app.use('/api/dashboard',dashboard )
app.use('/api/onbording',onbording )




export default app;