import { Component } from '@angular/core';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public users: IUser[] = [
    {
      name: 'Matheus Azambuja',
      username: 'Matheus',
      email: 'email.gmail.com',
      address: {
        number: 120,
        state: 'RS',
        street: 'Street A',
      },
      phone: '11 99999-9999',
    },
    {
      name: 'Matheus Azambuja',
      username: 'Matheus',
      email: 'email.gmail.com',
      address: {
        number: 120,
        state: 'RS',
        street: 'Street A',
      },
      phone: '11 99999-9999',
    },
    {
      name: 'Matheus Azambuja',
      username: 'Matheus',
      email: 'email.gmail.com',
      address: {
        number: 120,
        state: 'RS',
        street: 'Street A',
      },
      phone: '11 99999-9999',
    },
  ];
}
