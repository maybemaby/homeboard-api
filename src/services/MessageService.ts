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

async function getAllByHomeId(homeId: string) {
  return prisma.message.findMany({
    where: {
      homeId: homeId,
    },
  });
}

export default {
  createOne,
  getAllBySenderId,
  getAllByHomeId,
};
