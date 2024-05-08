
import ErrorHandler from '../../../middleWare/errorHandler.js';
import userExpenses from '../../../models/ userExpenses.js';
import expenseCategories from '../../../models/ExpenseCategories.js';


const addUserExpenses = async (req, res, next) => {
    try {
        const { userId,expenseCategoriesId } = req.query;
        const { title ,amount,date} = req.body;
        if (!title ||!amount ||!date) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: 'all felid requried field',
            });
        }
        const findskill = await expenseCategories.findOne({ expenseCategoriesId });
        console.log(findskill);
        const expenseCategoriesData = {
            expenseCategoriesId: findskill?.expenseCategoriesId,
            expenseCategoriesName: findskill?.expenseCategoriesName || null 
        };
        
        const addExpense = await userExpenses.create({
            userId:userId,
            title:title,
            amount:amount,
            date:date,
            expenseCategories:expenseCategoriesData

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

export default addUserExpenses;



