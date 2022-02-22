import { IRoommate } from "./Roommate";

type TaskFrequency = "daily" | "weekly" | "monthly" | "yearly";

export interface ITask {
  id: string;
  description?: string;
  createdAt: Date;
  beginsAt: Date;
  frequency: TaskFrequency;
  complete: boolean;
  completedBy: string;
  assignees?: IRoommate[];
  assigneeIds?: string[];
}
