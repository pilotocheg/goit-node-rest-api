import HttpError from "../helpers/HttpError.js";
import * as authServices from "../services/authServices.js";

export const registerUser = async (req, res) => {
  const result = await authServices.createUser(req.body);

  res.status(201).json(result);
};

export const loginUser = async (req, res) => {
  const result = await authServices.loginUser(req.body);

  if (!result) {
    throw new HttpError(401, "Email or password is wrong");
  }

  res.json(result);
};

export const logoutUser = async (req, res) => {
  await authServices.logoutUser(req.user);

  res.status(204).send();
};

export const getUser = async (req, res) => {
  res.json(authServices.getUserClientData(req.user));
};
