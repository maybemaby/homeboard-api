import prisma from "../data/db";
import { IUser } from "../models/User";
import authService from "./authService";

async function getAll() {
  return prisma.user.findMany();
}

async function getById(id: string) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function createOne(user: IUser) {
  const password = user.password;
  const hashed = await authService.hashPassword(password);
  if (hashed) {
    return prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: hashed,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        signUpDate: true,
        lastLogin: true,
      },
    });
  }
}

async function deleteOne(id: string) {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
}

async function login(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (user) {
    const result = await authService.comparePassword(password, user.password);
    if (result === true) {
      const { password, ...resBody } = user;
      return resBody;
    } else {
      return;
    }
  } else {
    return;
  }
}

export default {
  getAll,
  getById,
  createOne,
  deleteOne,
  login,
};
