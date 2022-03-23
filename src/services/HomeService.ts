import prisma from "../data/db";
import { IHome } from "../models/Home";

async function getAll() {
  return prisma.home.findMany({
    include: {
      roommates: true,
    },
  });
}

async function getById(id: string) {
  const home = await prisma.home.findUnique({
    where: {
      id: id,
    },
    include: {
      roommates: true,
      messages: {
        take: 10,
      },
      events: {
        take: 10,
      },
    },
  });
  return home;
}

async function createOne(home: Omit<IHome, "id" | "roommates">) {
  return prisma.home.create({
    data: {
      name: home.name,
      address: home.address,
    },
  });
}

async function editOne(id: string, data: IHome) {
  return prisma.home.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      address: data.address,
    },
  });
}

async function containsUser(userId: string, homeId: string) {
  const home = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    include: {
      roommates: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  if (home) {
    const users = home.roommates.map((roommate) => {
      if (roommate.user) {
        return roommate.user.id;
      }
    });
    return users.includes(userId);
  } else {
    throw new Error("Home not found");
  }
}

export default {
  getAll,
  getById,
  createOne,
  editOne,
  containsUser,
};
