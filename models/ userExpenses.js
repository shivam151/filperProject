import mongoose from "mongoose";

const  userExpensesSchema=new mongoose.Schema({
    userId:{
        type: String,
        default: ""
    },
    title:{
        type: String,
        default: ""
    },
    date:{
        type: String,
        default: ""
    },
    amount:{
        type: String,
        default: ""
    },
    expenseCategories:{
    expenseCategoriesId:{
        type: String,
        default: ""
    },
    expenseCategoriesName: {
        type: String,
        default: ""
    }
}
},
{
    versionKey: false,
})
const  userExpenses= mongoose.model(" userExpenses", userExpensesSchema,' userExpenses');
export default  userExpenses 