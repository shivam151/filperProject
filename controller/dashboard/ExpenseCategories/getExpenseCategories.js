import ErrorHandler from "../../../middleWare/errorHandler.js";
import expenseCategories from "../../../models/ExpenseCategories.js";



const getExpenseCategories = async (req, res, next) => {
    try {
        const ExpenseCategories = await expenseCategories.find();
        if (!ExpenseCategories) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: " ExpenseCategories Detail is not found",
            });
        }

        return res.status(200).json({
            status: true,
            code: 200,
            message: "Get ExpenseCategories Detail successfully",
            data: ExpenseCategories
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error.message, 500));
    }
};

export default getExpenseCategories;
