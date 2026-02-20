import Joi from "joi";

import { email, phone, string } from "./types.js";

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
