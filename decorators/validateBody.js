import { HttpError } from "../helpers/index.js"

export const validateBody = scheme => {
    const func = async(req, res, next) => {
        const {error} = scheme.validate(req.body)
        if(error) {
            return next(HttpError(400, error.message))
        }
        next()
    }
    return func
}

export default validateBody