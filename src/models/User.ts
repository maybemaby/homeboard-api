import { IHome } from "./Home";

interface UserMetaData {
  signUpDate: Date;
  lastLogin?: Date;
}

export interface IUser extends UserMetaData {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  homes: IHome[];
}
