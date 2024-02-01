import express from "express"
import authController from "../../controllers/auth-controller.js"
import { isEmptyBody }  from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import { userSigninScheme, userSignupScheme, userEmailScheme } from "../../models/User.js";
import authenticate from "../../middlewares/authenticate.js"
import upload from "../../middlewares/upload.js"
import resizeAvatar from "../../middlewares/resizeAvatar.js"

const authRouter = express.Router()

authRouter.post('/register', upload.single("avatarURL"), resizeAvatar, isEmptyBody, validateBody(userSignupScheme), authController.singup)

authRouter.post('/login', isEmptyBody, validateBody(userSigninScheme), authController.singin)

authRouter.post('/logout', authenticate, authController.signout)

authRouter.get('/current', authenticate, authController.getCurrent)

authRouter.patch('/avatars', authenticate, upload.single("avatarURL"), resizeAvatar, authController.updateAvatar)

authRouter.get("/verify/:verificationToken", authController.verify)

authRouter.post("/verify", validateBody(userEmailScheme), isEmptyBody, authController.resendVerificationEmail)

export default authRouter