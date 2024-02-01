import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises"
import path from "path";
import gravatar from "gravatar";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

dotenv.config();

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars") 

export const singup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	let avatarURL = gravatar.url(email, {
		s: "200",
		r: "pg",
		d: "avatar",
	});
	console.log(avatarURL);
	if (req.file) {
		const { path: oldPath, filename } = req.file;
		const newPath = path.join(avatarPath, filename);
		await fs.rename(oldPath, newPath);
		avatarURL = path.join("avatars", filename);
	}

	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
			avatarURL: newUser.avatarURL,
		},
	});
};

export const singin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

export const signout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({ message: "Logout succesfull" });
};

export const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;
	res.json({ email, subscription });
};

const updateAvatar = async (req, res) => {
	const { _id, avatarURL: oldURL } = req.user;
	let avatarURL = req.user.avatarURL;
	if (req.file) {
		const { path: oldPath, filename } = req.file;
		const newPath = path.join(avatarPath, filename);
		await fs.rename(oldPath, newPath);
		avatarURL = path.join("avatars", filename);
	}

	const result = await User.findOneAndUpdate({ _id }, { avatarURL }, { new: true });
	if (!result) {
		throw HttpError(404, "User not found");
	}

	if(oldURL.startsWith('avatars')){//видалення старого файлу, якщо він був
        const oldAvatarPath = path.resolve('public', oldURL);//шлях до старого файлу        
        await fs.unlink(oldAvatarPath);
    }     

	res.json({
		avatarURL: result.avatarURL,
	});
};

export default {
	singup: controllerWrapper(singup),
	singin: controllerWrapper(singin),
	signout: controllerWrapper(signout),
	getCurrent: controllerWrapper(getCurrent),
	updateAvatar: controllerWrapper(updateAvatar),
};