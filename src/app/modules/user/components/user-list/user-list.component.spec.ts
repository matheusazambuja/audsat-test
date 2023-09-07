import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { AdminLogsService } from '../../../../core/services/admin-logs.service';
import { of } from 'rxjs';
import { usersMock } from '../../../../../testing/mocks/users.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { IUser } from '../../models/user.interface';
import { LogAction } from '../../../../core/constants/log-action.type.enum';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let adminLogsService: AdminLogsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserListComponent, UserFilterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(UserListComponent);

    userService = TestBed.inject(UserService);
    adminLogsService = TestBed.inject(AdminLogsService);
    router = TestBed.inject(Router);
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(usersMock));
    jest.spyOn(adminLogsService, 'setAdminAction').mockImplementation();

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users in initialization', () => {
    // Assert
    expect(userService.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should navigate to post view when click on post in table', () => {
    // Arrange
    const firstPostElement = fixture.debugElement.query(By.css('#user-item-0')).nativeElement;
    jest.spyOn(router, 'navigate');

    // Action
    firstPostElement.click();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/posts/1/view']);
  });

  it('should fetch again when filter', () => {
    // Arrange
    const formValueMock = {
      name: 'User Test 1',
      username: 'user-test-1',
      email: 'user-test-1@gmail.com',
    };

    // Action
    component.handleFilter(formValueMock as IUser);

    // Assert
    expect(userService.getUsers).toHaveBeenCalledTimes(2);
    expect(userService.getUsers).toHaveBeenCalledWith(formValueMock);
    expect(adminLogsService.setAdminAction).toHaveBeenCalledTimes(2);
    expect(adminLogsService.setAdminAction).toHaveBeenCalledWith(LogAction.FILTER_USERS);
  });
});
