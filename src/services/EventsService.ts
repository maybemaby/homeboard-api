import { Prisma } from "@prisma/client";
import prisma from "../data/db";
import { IEvent } from "../models/Event";

async function getAll(filter: Prisma.EventWhereInput) {
  return prisma.event.findMany({
    include: {
      createdBy: true,
    },
    where: filter,
  });
}

async function getById(id: string) {
  return prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      createdBy: true,
      home: {
        select: {
          id: true,
        },
      },
    },
  });
}

async function createOne(event: IEvent) {
  return prisma.event.create({
    data: {
      name: event.name,
      beginsAt: new Date(event.beginsAt),
      endsAt: event.endsAt,
      description: event.description,
      createdBy: {
        connect: {
          id: event.createdById,
        },
      },
      home: {
        connect: {
          id: event.homeId,
        },
      },
    },
  });
}

async function deleteOne(id: string) {
  return prisma.event.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getById,
  createOne,
  deleteOne,
};
