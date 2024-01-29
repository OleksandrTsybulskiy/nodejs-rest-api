import Contact from "../models/Contact.js";
import {HttpError} from "../helpers/index.js"
import controllerWrapper from "../decorators/controllerWrapper.js";

export const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

export const getById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id)
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
    }
    res.json(result);
};

export const addContact = async (req, res) => {
        const {error} = Contact.create(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await Contact.create(req.body)
        res.status(201).json(result)
}

export const updateById = async (req, res) => {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body)
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }
        res.json(result);
}

export const deleteById = async (req, res) => {
        const {id} = req.params;
        const result = await Contact.findByIdAndDelete(id)
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }
        res.status(200).json({
            message: "Contact removed"
        })
}

export default {
	getAll: controllerWrapper(getAll),
	getContactById: controllerWrapper(getById),
	addContact: controllerWrapper(addContact),
	deleteContact: controllerWrapper(deleteById),
	updateContactById: controllerWrapper(updateById),
};

