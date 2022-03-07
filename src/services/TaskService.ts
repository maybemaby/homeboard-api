import prisma from "../data/db";
import { ITask } from "../models/Task";
import { add } from "date-fns";
import { Task } from "@prisma/client";

async function getOne(id: string) {
  return prisma.task.findUnique({
    where: {
      id: id,
    },
  });
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
};
