import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminLogsService } from '../../../../core/services/admin-logs.service';
import { LogAction } from '../../../../core/constants/log-action.type.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: IUser[];

  private unsubscribe$ = new Subject<void>();
  private readonly FILTER_USER_ACTION = LogAction.FILTER_USERS;

  constructor(
    private userService: UserService,
    private adminLogsService: AdminLogsService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.getUsersData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public handleFilter(formValue: IUser): void {
    this.getUsersData(formValue);
  }

  public handleUserPosts(user: IUser): void {
    const { id } = user;
    this.router.navigate([`/posts/${id}/view`]);
  }

  private getUsersData(formValue?: IUser): void {
    this.userService
      .getUsers(formValue)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.adminLogsService.setAdminAction(this.FILTER_USER_ACTION);
        }),
      )
      .subscribe(users => {
        this.users = users;
      });
  }
}
