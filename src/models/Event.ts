import { IHome } from "./Home";
import { IRoommate } from "./Roommate";

export interface IEvent {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  beginsAt: Date;
  endsAt?: Date;
  Home: IHome;
  homeId: string;
  createdBy: IRoommate;
  createdById: string;
}
