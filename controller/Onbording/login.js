import bcrypt from "bcrypt"
import userModel from "../../models/userModel.js";
import { signJwt } from "../../middleWare/auth.js";
import ErrorHandler from "../../middleWare/errorHandler.js";



const login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email && !password) {
          return res.status(422).json({
            status: false,
            code: 422,
            message: "Please fill all the required field",
          });
        } 
          let findUser = await userModel.findOne({ email }).lean();
          if (!findUser) {
            return res.status(404).json({
              status: false,
              code: 404,
              message: "Invalid Credentials",
            });
          }
          const validatePassword = await bcrypt.compare(
            password,
            findUser.password
          );
          if (!validatePassword) {
            return res.status(401).json({
              code: 401,
              status: false,
              message: "Invalid Credentials",
            });
          }
          email = findUser.email;
          password = findUser.password;
          const userId =findUser.userId;
          const  name =findUser.firstName;
          const lastname =findUser.lastName;
          const jwtToken = await signJwt({
            email,
            userId,
            name,
            lastname,
          });
    
          return res.status(200).json({
            status: true,
            code: 200,
            message: "Logged in successfully!!",
            data: jwtToken,
          });
        
    } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message, 500));
}
}

export default login
