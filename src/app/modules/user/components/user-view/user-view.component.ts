import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  public user: IUser = {
    name: 'Matheus Azambuja',
    username: 'Matheus',
    email: 'email.gmail.com',
    address: {
      number: 120,
      state: 'RS',
      street: 'Street A',
    },
    phone: '11 99999-9999',
  };

  constructor() {}

  public ngOnInit(): void {}
}
