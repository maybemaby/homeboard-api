import prisma from "../data/db";
import { IUser } from "../models/User";

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
  return prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
  });
}

async function deleteOne(id: string) {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getById,
  createOne,
  deleteOne
};
