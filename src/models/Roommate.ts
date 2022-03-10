import { TasksOnRoommates } from "@prisma/client";
import { IEvent } from "./Event";
import { IHome } from "./Home";
import { IMessage } from "./Message";

export type RoommateRole = "Manager" | "Roommate";

export interface IRoommate {
  id: string;
  userId: string;
  role: RoommateRole;
  home: IHome;
  homeId: string;
  sentMessages: IMessage[];
  events: IEvent[];
  tasks: TasksOnRoommates[];
}
