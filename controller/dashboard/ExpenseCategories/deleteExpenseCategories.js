import ErrorHandler from '../../../middleWare/errorHandler.js';
import expenseCategories from '../../../models/ExpenseCategories.js';

const deleteExpenseCategories = async (req, res, next) => {
    try {
        const { expenseCategoriesId } = req.query; 
        if (!expenseCategoriesId) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: 'expenseCategoriesId required field',
            });
        }
        
        const deletedExpenseCategory = await expenseCategories.findOneAndDelete({ expenseCategoriesId });
        
        if (!deletedExpenseCategory) {
            return res.status(404).json({
                status: false,
                code: 404,
                message: 'Expense category not found',
            });
        }

        return res.status(200).json({
            status: true,
            code: 200,
            message: 'Expense category deleted successfully',
            data: deletedExpenseCategory,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error.message, 500));
    }
};

export default deleteExpenseCategories;
