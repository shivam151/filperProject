import express from 'express';
import addExpenseCategories from '../controller/dashboard/ExpenseCategories/addExpenseCategories.js';
import getExpenseCategories from '../controller/dashboard/ExpenseCategories/getExpenseCategories.js';
import deleteExpenseCategories from '../controller/dashboard/ExpenseCategories/deleteExpenseCategories.js';
import addUserExpenses from '../controller/dashboard/userExpenses/addUserExpenses.js';
import getUserExpenses from '../controller/dashboard/userExpenses/getUserExpenses.js';
import { verifyJwt } from '../middleWare/auth.js';



const router = express.Router();

//  ExpenseCategories
router.post('/addExpenseCategories',verifyJwt,addExpenseCategories)
router.get('/getExpenseCategories',verifyJwt,getExpenseCategories)
router.delete('/deleteExpenseCategories',verifyJwt,deleteExpenseCategories)


router.post('/addUserExpenses',verifyJwt,addUserExpenses)
router.get('/getUserExpenses',verifyJwt,getUserExpenses)

export default router;
