import prisma from "../data/db";
import { ITask } from "../models/Task";
import { add } from "date-fns";
import { Prisma, Task } from "@prisma/client";

async function getOne(id: string) {
  return prisma.task.findUnique({
    where: {
      id: id,
    },
    include: {
      assignees: {
        select: {
          roommate: {
            select: {
              id: true,
              homeId: true,
              role: true,
              user: true,
            },
          },
        },
      },
    },
  });
}

async function getAll(
  filter: Prisma.TaskWhereInput,
  start?: string,
  size?: number
) {
  if (typeof start !== "undefined") {
    return prisma.task.findMany({
      where: filter,
      cursor: {
        id: start,
      },
      take: size ? size : 10,
    });
  } else {
    return prisma.task.findMany({
      where: filter,
      take: size ? size : 10,
    });
  }
}

async function createOne(task: ITask) {
  return prisma.task.create({
    data: {
      description: task.description,
      beginsAt: task.beginsAt,
      complete: false,
      frequency: task.frequency,
      assignees: {
        create: [
          {
            roommate: {
              connect: {
                id: task.roommateId,
              },
            },
          },
        ],
      },
    },
  });
}

async function completeOne(id: string, completer: string) {
  const prevTask = await prisma.task.findUnique({
    where: {
      id: id,
    },
    include: {
      assignees: true,
    },
  });
  if (prevTask) {
    let newDate: Date | null;
    switch (prevTask.frequency) {
      case "daily":
        newDate = add(prevTask.beginsAt, {
          days: 1,
        });
        break;
      case "weekly":
        newDate = add(prevTask.beginsAt, {
          weeks: 1,
        });
        break;
      case "monthly":
        newDate = add(prevTask.beginsAt, {
          months: 1,
        });
        break;
      case "yearly":
        newDate = add(prevTask.beginsAt, {
          years: 1,
        });
        break;
      default:
        newDate = null;
        break;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: prevTask.id,
      },
      data: {
        completedBy: completer,
        complete: true,
      },
    });

    let newTask: Task | undefined;
    if (prevTask.frequency !== "norepeat" && newDate !== null) {
      const connectRoomates = prevTask.assignees.map((relation) => {
        return {
          roommate: {
            connect: {
              id: relation.roommateId,
            },
          },
        };
      });
      newTask = await prisma.task.create({
        data: {
          description: prevTask.description,
          beginsAt: newDate,
          frequency: prevTask.frequency,
          assignees: {
            create: connectRoomates,
          },
        },
      });
    }

    return {
      completed: updatedTask,
      new: newTask,
    };
  }
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      complete: true,
      completedBy: completer,
    },
  });
}

export default {
  getOne,
  createOne,
  completeOne,
  getAll,
};
