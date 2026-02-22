import User from "../db/models/User.js";
import { createToken } from "../helpers/jwtToken.js";
import { comparePassword, hashPassword } from "../helpers/hash.js";

export const getUserClientData = (dbUser) => ({
  email: dbUser.email,
  subscription: dbUser.subscription,
});

export const findUser = (where) => User.findOne({ where });

export const createUser = async ({ password, email }) => {
  const hashedPassword = await hashPassword(password);

  const dbUser = await User.create({
    email,
    password: hashedPassword,
  });

  return {
    user: getUserClientData(dbUser),
  };
};

export const loginUser = async ({ email, password }) => {
  const dbUser = await findUser({ email });

  if (!dbUser) {
    return null;
  }

  const passwordCorrect = await comparePassword(password, dbUser.password);

  if (!passwordCorrect) {
    return null;
  }

  const token = createToken({ id: dbUser.id });

  await dbUser.update({ token });

  return {
    token,
    user: getUserClientData(dbUser),
  };
};

export const logoutUser = async (user) => {
  return user.update({ token: null });
};
