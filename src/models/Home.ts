import { IMessage } from "./Message";
import { IRoommate } from "./Roommate";

export interface IHome {
  id: string;
  name: string;
  roommates: IRoommate[];
  messages: IMessage[];
  createdAt: Date;
}
