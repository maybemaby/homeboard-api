import prisma from "../data/db";
import { IMessage } from "../models/Message";

async function createOne(message: IMessage) {
  return prisma.message.create({
    data: {
      content: message.content,
      receiverId: message.receiverId,
      sender: {
        connect: {
          id: message.senderId,
        },
      },
      Home: {
        connect: {
          id: message.homeId,
        },
      },
    },
  });
}

async function getAllBySenderId(senderId: string) {
  return prisma.message.findMany({
    where: {
      senderId: senderId,
    },
  });
}

async function getAllByHomeId(homeId: string, start?: string, size?: number) {
  if (typeof start !== "undefined") {
    return prisma.message.findMany({
      where: {
        homeId: homeId,
      },
      cursor: {
        id: start,
      },
      take: size ? size : 10,
    });
  } else {
    return prisma.message.findMany({
      where: {
        homeId: homeId,
      },
      take: size ? size : 10,
    });
  }
}

export default {
  createOne,
  getAllBySenderId,
  getAllByHomeId,
};
