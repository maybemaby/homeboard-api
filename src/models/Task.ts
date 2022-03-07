import { IRoommate } from "./Roommate";

type TaskFrequency = "daily" | "weekly" | "monthly" | "yearly" | "norepeat";

export interface ITask {
  id: string;
  description?: string;
  createdAt: Date;
  beginsAt: Date;
  frequency: TaskFrequency;
  complete: boolean;
  completedBy?: string;
  roommate?: IRoommate;
  roommateId: string;
}
