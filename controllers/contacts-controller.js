import Contact from "../models/Contact.js";
import {HttpError} from "../helpers/index.js"
import controllerWrapper from "../decorators/controllerWrapper.js";

export const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const query = { owner } 
    const result = await Contact.find(query).populate("owner", "email subscribtion");
    if(result.length === 0){
        throw HttpError(404, `No contacts added`);            
    }
    res.json(result);
};

export const getById = async (req, res) => {
    const {_id: owner} = req.user
	const { id } = req.params;
	const result = await Contact.findOne({_id: id, owner});
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
        const {_id: owner} = req.user
        const result = await Contact.create({...req.body, owner})
        res.status(201).json(result)
}

export const updateById = async (req, res) => {
        const {_id: owner} = req.user
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate({_id: id, owner}, req.body)
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }
        res.json(result);
}

export const deleteById = async (req, res) => {
        const {id} = req.params;
        const {_id: owner} = req.user
        const result = await Contact.findByIdAndDelete({_id: id, owner})
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

