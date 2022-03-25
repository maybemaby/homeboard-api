import prisma from "../data/db";
import { IRoommate, RoommateRole } from "../models/Roommate";
import HomeService from "./HomeService";

async function getAll(homeId?: string) {
  if (homeId) {
    return prisma.roommate.findMany({
      where: {
        homeId: homeId,
      },
    });
  }
  return prisma.roommate.findMany();
}

async function getById(id: string) {
  return prisma.roommate.findUnique({
    where: {
      id: id,
    },
    include: {
      sentMessages: {
        take: 10,
      },
    },
  });
}

// If roommate contains a homeId, connect to existing home
// If it contains a full Home object, attempt to connect or create
// If neither, throw error.
async function createOne(roommate: IRoommate) {
  if (roommate.homeId) {
    if (await HomeService.containsUser(roommate.userId, roommate.homeId)) {
      throw new Error("User already has a profile in this home");
    }
    return prisma.roommate.create({
      data: {
        role: roommate.role,
        user: {
          connect: { id: roommate.userId },
        },
        home: {
          connect: { id: roommate.homeId },
        },
      },
    });
  } else if (roommate.home) {
    if (await HomeService.containsUser(roommate.userId, roommate.home.id)) {
      throw new Error("User already has a profile in this home");
    }
    return prisma.roommate.create({
      data: {
        role: roommate.role,
        user: {
          connect: {
            id: roommate.userId,
          },
        },
        home: {
          connectOrCreate: {
            where: {
              id: roommate.home.id,
            },
            create: {
              name: roommate.home.id,
            },
          },
        },
      },
    });
  } else {
    throw new Error(
      "Data does not contain necessary homeId or home properties"
    );
  }
}

async function deleteOne(id: string) {
  return prisma.roommate.delete({
    where: {
      id: id,
    },
  });
}

async function changeRole(id: string, role: RoommateRole) {
  return prisma.roommate.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });
}

export default {
  getAll,
  getById,
  createOne,
  deleteOne,
  changeRole,
};
