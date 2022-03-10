import { IEvent } from "./Event";
import { IMessage } from "./Message";
import { IRoommate } from "./Roommate";

export interface IHome {
  id: string;
  name: string;
  address: string;
  roommates: IRoommate[];
  messages: IMessage[];
  createdAt: Date;
  events: IEvent[];
}
