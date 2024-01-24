import * as contactsService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js"
import {contactAddScheme, contactUpdateScheme} from "../schemas/contact-scheme.js"

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.json(result);
  } 
  catch (error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById(id)
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
    }

    res.json(result);
  } 
  catch (error) {
   next(error)
  }
};

const addContact = async (req, res, next) => {
    try {
        const {error} = contactAddScheme.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }

        const result = await contactsService.addContact()

        res.status(201).json(result)
    } 
    catch (error) {
        next(error) 
    }
}

const updateById = async (req, res, next) => {
    try {
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
    catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.removeContact(id)
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }

        res.status(204).json({
            message: "Contact succesfully removed"
        })
    } 
    catch (error) {
        next(error)
    }
}

export default {
  getAll,
  getById,
  addContact,
  updateById,
  deleteById
};
