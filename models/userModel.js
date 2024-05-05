import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    accountType: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }

}, {
    versionKey: false,
});

const userModel = mongoose.model("userModel", userSchema, 'userModel');
export default userModel;
