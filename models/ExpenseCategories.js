import mongoose from "mongoose";

const expenseCategoriesSchema=new mongoose.Schema({
    expenseCategoriesId:{
        type: String,
        default: ""
    },
    expenseCategoriesName: {
        type: String,
        default: ""
    }
},
{
    versionKey: false,
})
const expenseCategories= mongoose.model("expenseCategories",expenseCategoriesSchema,'expenseCategories');
export default expenseCategories 