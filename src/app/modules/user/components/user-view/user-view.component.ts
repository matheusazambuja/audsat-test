import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  @Input() public id: number;

  public user: IUser;
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.loadUserData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadUserData(): void {
    this.userService
      .getUser(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.user = user;
      });
  }
}
