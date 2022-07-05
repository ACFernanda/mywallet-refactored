import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { usersRepository } from "../repositories/userRepository.js";

async function signUp({ name, email, password }) {
  const existingUsers = await usersRepository.selectUserByEmail(email);

  if (existingUsers.rowCount > 0) {
    return res.sendStatus(409);
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  await usersRepository.insertUser(name, email, hashedPassword);
}

async function signIn(email, password) {
  const { rows } = await usersRepository.selectUserByEmail(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

export const authService = {
  signUp,
  signIn,
};
