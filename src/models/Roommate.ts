import { IUser } from "./User";

type RoommateRole = "Manager" | "Roommate";

export interface IRoommate {
  id: string;
  user: IUser;
  role: RoommateRole;
}
