
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import ErrorHandler from '../middleWare/errorHandler.js';
import Randomstring from 'randomstring';


const signUp = async (req, res, next) => {
    try {
        const { accountType,firstName, lastName,  email, password } = req.body;
        if (!accountType ||!email || !password  || !firstName || !lastName ) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: 'please fill the all the requried field',
            });
        }
        const findemail = await userModel.findOne({ email: email });
        if (findemail) {
            return res.status(422).json({
                status: false,
                code: 422,
                message: 'Email is already in use',
            });
        }

        
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const userId =Randomstring.generate(6);
        const newAccount = await userModel.create({
            accountType:accountType,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword,
        });
       
        return res.status(200).json({
            status: true,
            code: 200,
            message: 'add NewUser Successfully',
            data: newAccount,
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
};

export default signUp;
