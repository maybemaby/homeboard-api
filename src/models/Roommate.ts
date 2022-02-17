import { IHome } from "./Home";

type RoommateRole = "Manager" | "Roommate";

export interface IRoommate {
  id: string;
  userId: string;
  role: RoommateRole;
  home: IHome;
  homeId: string;
}
