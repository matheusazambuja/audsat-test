import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../../../core/services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: IUser[];
  private readonly DEBOUNCE_TIME_FILTER = 1000;

  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService) {
    this.getUsers();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getUsers(formValue?: any): void {
    this.userService
      .getUsers(formValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });
  }
}
