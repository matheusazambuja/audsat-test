export interface IUser {
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
}

export interface IUserAddress {
  number: number;
  street: string;
  state: string;
}
