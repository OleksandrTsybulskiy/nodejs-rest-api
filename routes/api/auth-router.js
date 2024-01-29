import express from "express"
import authController from "../../controllers/auth-controller.js"
import { isEmptyBody}  from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import { userSigninScheme, userSignupScheme } from "../../models/User.js";
import authenticate from "../../middlewares/authenticate.js"

const authRouter = express.Router()

authRouter.post('/register', isEmptyBody, validateBody(userSignupScheme), authController.singup)

authRouter.post('/login', isEmptyBody, validateBody(userSigninScheme), authController.singin)

authRouter.post('/logout', authenticate, authController.signout)

authRouter.get('/current', authenticate, authController.getCurrent)

export default authRouter