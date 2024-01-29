import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export const isValidateId = (req, res, next) => {
	const {id}  = req.params;
	if (!isValidObjectId(id)) {
		return next(HttpError(400, `${id} is not valid Id`));
	}
    next()
};

export default isValidateId