import prisma from "../data/db";
import { IHome } from "../models/Home";

async function getAll() {
  return prisma.home.findMany();
}

async function getById(id: string) {
  const home = await prisma.home.findUnique({
    where: {
      id: id,
    },
  });
  return home;
}

async function createOne(home: Omit<IHome, "id" | "roommates">) {
  return prisma.home.create({
    data: {
      name: home.name,
    },
  });
}

export default {
  getAll,
  getById,
  createOne,
};
