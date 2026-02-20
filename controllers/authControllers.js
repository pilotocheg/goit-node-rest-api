import * as authServices from "../services/authServices.js";

export const registerUser = async (req, res) => {
  const user = await authServices.createUser(req.body);

  res.status(201).json(user);
};
