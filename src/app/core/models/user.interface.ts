export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
