import Joi from "joi";

const string = () => Joi.string();
const email = () => string().email();
const phone = () =>
  string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": 'Phone number must of a format "(xxx) xxx-xxxx"',
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
