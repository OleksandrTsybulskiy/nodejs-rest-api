import express from "express";
import contactsController from "../../controllers/contacts-controller.js" 
import {isEmptyBody} from "../../middlewares/index.js"
import validateBody from "../../decorators/validateBody.js"
import {contactAddScheme, contactUpdateScheme} from "../../schemas/contact-scheme.js"

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', contactsController.getContactById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddScheme), contactsController.addContact)

contactsRouter.delete('/:id', contactsController.deleteContact)

contactsRouter.put('/:id', isEmptyBody, validateBody(contactUpdateScheme), contactsController.updateContactById)

export default contactsRouter