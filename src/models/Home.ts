import { IRoommate } from "./Roommate";

export interface IHome {
  id: string;
  name: string;
  roommates: IRoommate[];
  createdAt: Date;
}
