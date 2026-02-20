import Joi from "joi";
import {
  emailValidationErrMessage,
  emailValidationPattern,
  phoneValidationErrMessage,
  phoneValidationPattern,
} from "../constants/validation.js";

export const string = () => Joi.string();
export const email = () =>
  string().regex(emailValidationPattern).messages({
    "string.pattern.base": emailValidationErrMessage,
  });
export const phone = () =>
  string().regex(phoneValidationPattern).messages({
    "string.pattern.base": phoneValidationErrMessage,
  });
