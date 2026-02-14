import Joi from "joi";
import {
  phoneValidationErrMessage,
  phoneValidationPattern,
} from "../constants/contacts.js";

const string = () => Joi.string();
const email = () => string().email();
const phone = () =>
  string().regex(phoneValidationPattern).messages({
    "string.pattern.base": phoneValidationErrMessage,
  });

export const createContactSchema = Joi.object({
  name: string().required(),
  email: email().required(),
  phone: phone().required(),
});

export const updateContactSchema = Joi.object({
  name: string(),
  email: email(),
  phone: phone(),
})
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });

export const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
