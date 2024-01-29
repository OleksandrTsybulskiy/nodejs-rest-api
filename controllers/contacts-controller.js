import * as contactsService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js"
import {contactAddScheme, contactUpdateScheme} from "../schemas/contact-scheme.js"
import controllerWrapper from "../decorators/controllerWrapper.js";

const getAll = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const {id} = req.params;
    const result = await contactsService.getContactById(id)
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
    }
    res.json(result);
};

const addContact = async (req, res) => {
        const {error} = contactAddScheme.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await contactsService.addContact(req.body)
        res.status(201).json(result)
}

const updateById = async (req, res) => {
        const {error} = contactUpdateScheme.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const {id} = req.params;
        const result = await contactsService.updateContact(id, req.body)
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }
        res.json(result);
}

const deleteById = async (req, res) => {
        const {id} = req.params;
        const result = await contactsService.removeContact(id)
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
