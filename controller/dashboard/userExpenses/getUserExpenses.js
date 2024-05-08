import ErrorHandler from "../../../middleWare/errorHandler.js";
import userExpenses from "../../../models/ userExpenses.js";

const getUserExpenses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        const userExpensesdetail = await userExpenses.find().skip(skip).limit(limit);

        if (!userExpensesdetail || userExpensesdetail.length === 0) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: "No userExpenses Detail found",
            });
        }

        return res.status(200).json({
            status: true,
            code: 200,
            message: "Get userExpenses Detail successfully",
            data: userExpensesdetail
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error.message, 500));
    }
};

export default getUserExpenses;
