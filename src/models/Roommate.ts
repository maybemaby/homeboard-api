import { IHome } from "./Home";
import { IMessage } from "./Message";

type RoommateRole = "Manager" | "Roommate";

export interface IRoommate {
  id: string;
  userId: string;
  role: RoommateRole;
  home: IHome;
  homeId: string;
  sentMessages: IMessage[];
}
