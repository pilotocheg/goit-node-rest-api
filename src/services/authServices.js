import gravatar from "gravatar";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import User from "../db/models/User.js";
import { createToken } from "../helpers/jwtToken.js";
import { comparePassword, hashPassword } from "../helpers/hash.js";
import sendEmail from "../helpers/sendEmail.js";
import HttpError from "../helpers/HttpError.js";

const sendVerificationEmail = (user) => {
  const { email, verificationToken } = user;
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${verificationToken}">Verify email</a>`,
  };

  return sendEmail(verifyEmail);
};

export const getUserClientData = (dbUser) => ({
  email: dbUser.email,
  subscription: dbUser.subscription,
  avatarURL: dbUser.avatarURL,
});

export const findUser = (where) => User.findOne({ where });

export const createUser = async ({ password, email }) => {
  const hashedPassword = await hashPassword(password);
  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, { protocol: "https", s: "200" });

  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  await sendVerificationEmail(newUser);

  return {
    user: getUserClientData(newUser),
  };
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return await user.update({ verify: true, verificationToken: "" });
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  return sendVerificationEmail(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordCorrect = await comparePassword(password, user.password);

  if (!passwordCorrect) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw new HttpError(401, "Email not verified");
  }

  const token = createToken({ id: user.id });

  await user.update({ token });

  return {
    token,
    user: getUserClientData(user),
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
