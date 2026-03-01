import User from "../db/models/User.js";
import { createToken } from "../helpers/jwtToken.js";
import { comparePassword, hashPassword } from "../helpers/hash.js";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";

export const getUserClientData = (dbUser) => ({
  email: dbUser.email,
  subscription: dbUser.subscription,
  avatarURL: dbUser.avatarURL,
});

export const findUser = (where) => User.findOne({ where });

export const createUser = async ({ password, email }) => {
  const hashedPassword = await hashPassword(password);

  const avatarURL = gravatar.url(email, { protocol: "https", s: "200" });

  const dbUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
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

export const logoutUser = (user) => user.update({ token: null });

export const updateUserAvatar = async (user, file) => {
  let avatarURL = null;
  if (file) {
    const newPath = path.resolve("public", "avatars", file.filename);
    await fs.rename(file.path, newPath);
    avatarURL = path.join("avatars", file.filename);
  }

  await user.update({ avatarURL });

  return avatarURL;
};
