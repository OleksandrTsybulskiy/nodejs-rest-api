import { HttpError } from "../helpers/index.js";

export const isEmptyBody = (req, res, next) => {
    const {length} = Object.keys(req.body)
    if (!length) {
        return next(HttpError(400, "Fields are empty!"))
    }
    next()
}

export default isEmptyBody