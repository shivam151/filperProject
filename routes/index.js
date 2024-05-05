import express from 'express';
const app = express.Router();


import dashboard from './dashboard.js'





app.use('/api/dashboard',dashboard )



export default app;