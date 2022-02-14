import { IHome } from "./Home";

interface UserMetaData {
  signUpDate: Date;
  lastLogin: Date;
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  homes: IHome[];
  metadata: UserMetaData;
}