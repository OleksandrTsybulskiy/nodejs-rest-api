import express from "express";
import contactsController from "../../controllers/contacts-controller.js" 
import {isEmptyBody} from "../../middlewares/index.js"
import validateBody from "../../decorators/validateBody.js"
import {contactAddScheme, contactUpdateScheme} from "../../schemas/contact-scheme.js"

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId', contactsController.getContactById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddScheme), contactsController.addContact)

contactsRouter.delete('/:contactId', contactsController.deleteContact)

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactUpdateScheme), contactsController.updateContactById)

export default contactsRouter