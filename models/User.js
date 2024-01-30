import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const subscriptionValue = ["starter", "pro", "business"];

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		avatarURL: {
			type: String,
		},
		subscription:{
			type: String,
			enum: subscriptionValue,
			default: "starter",
		},
		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError)

export const userSignupScheme = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailPattern).required(),
})

export const userSigninScheme = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailPattern).required()
})

const User = model('user', userSchema)

export default User