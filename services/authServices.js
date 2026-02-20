import bcrypt from "bcrypt";

import User from "../db/models/User.js";

export const createUser = async (data) => {
  const { password, ...userData } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    ...userData,
    password: hashedPassword,
  });
};
