import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorHandler from './errorHandler.js';
import userModel from '../models/onboarding/userModel.js';

dotenv.config();
async function signJwt(payloadData) {
    const jwtPayload = payloadData;

    const addToken = { ...payloadData };

    addToken.token = JWT.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TIMEOUT_DURATION,
    });

    return addToken;
}

async function verifyJwt(req, res, next) {
    const { authorization } = req.headers;
  
    try {
      if (!authorization) {
        return res.status(401).json({
          success: false,
          code: 401,
          message: "Not Authorized",
        });
      } else if (authorization) {
        const verifyValidToken = JWT.decode(authorization);
  
        if (!verifyValidToken) {
          return res
            .status(401)
            .json({ success: false, code: 401, message: "Not Authorized" });
        } else {
          const decoded = await JWT.verify(
            authorization,
            process.env.ACCESS_TOKEN_SECRET,
            {
              ignoreExpiration: true,
            }
          );
  
          const findUserWithAuth = await userModel.findOne({
            email: decoded.email,
          }).lean();
  
          const todayDate = new Date().getTime();
  
          if (decoded.exp < todayDate / 1000) {
            return res
              .status(401)
              .json({ status: false, code: 401, message: "Not Authorized" });
          } else if (decoded.is_active && decoded.is_active === 0) {
            return res
              .status(401)
              .json({ status: false, code: 401, message: "Not Authorized" });
          } else if (findUserWithAuth) {
            req.authData = decoded;
            req.propertyData = findUserWithAuth.recent_property;
            next();
          } else {
            return res
              .status(401)
              .json({ status: false, code: 401, message: "Not Authorized" });
          }
        }
      }
    } catch (error) {
      if (error.message === "invalid signature") {
        return res
          .status(401)
          .json({ status: false, code: 401, message: "Not Authorized" });
      } else {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  }

export { signJwt,verifyJwt }