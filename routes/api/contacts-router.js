import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import { isEmptyBody, isValidateId, isEmptyBodyFavorite} from "../../middlewares/index.js"
import validateBody from "../../decorators/validateBody.js"
import { contactAddScheme, contactUpdateScheme, contactFavoriteScheme } from "../../models/Contact.js"

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', contactsController.getContactById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddScheme), contactsController.addContact)

contactsRouter.delete('/:id', isValidateId, contactsController.deleteContact)

contactsRouter.put('/:id', isValidateId, isEmptyBody, validateBody(contactUpdateScheme), contactsController.updateContactById)

contactsRouter.patch('/:id/favorite', isEmptyBodyFavorite, isValidateId, validateBody(contactFavoriteScheme), contactsController.updateContactById)

export default contactsRouter