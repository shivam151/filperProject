
import ErrorHandler from '../../../middleWare/errorHandler.js';
import Randomstring from 'randomstring';
import expenseCategories from '../../../models/ExpenseCategories.js';


const addExpenseCategories = async (req, res, next) => {
    try {
        const { expenseCategoriesName } = req.body;
        if (!expenseCategoriesName ) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: 'expenseCategoriesName requried field',
            });
        }
        
        const addExpense = await expenseCategories.create({
            expenseCategoriesId:Randomstring.generate(6),
            expenseCategoriesName:expenseCategoriesName
        });
       
        return res.status(200).json({
            status: true,
            code: 200,
            message: 'add NewUser Successfully',
            data: addExpense,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
};

export default addExpenseCategories;
