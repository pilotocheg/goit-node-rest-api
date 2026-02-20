import User from "../db/models/User.js";

export const createUser = async (data) => User.create(data);
