import * as authServices from "../services/authServices.js";

export const registerUser = async (req, res) => {
  const { email, subscription } = await authServices.createUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};
