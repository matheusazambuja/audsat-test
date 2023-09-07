import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UserViewComponent } from './user-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { usersMock } from '../../../../../testing/mocks/users.mock';
import { By } from '@angular/platform-browser';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let userService: UserService;
  const userMock = usersMock[0];
  const idUserMock = userMock.id;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserViewComponent],
    });
    fixture = TestBed.createComponent(UserViewComponent);

    userService = TestBed.inject(UserService);
    jest.spyOn(userService, 'getUser').mockReturnValue(of(userMock));

    component = fixture.componentInstance;
    component.id = idUserMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user', () => {
    // Assert
    expect(userService.getUser).toHaveBeenCalledTimes(1);
    expect(userService.getUser).toHaveBeenCalledWith(idUserMock);
    expect(component.user).toEqual(userMock);
  });

  it('should set user information in template', () => {
    // Arrange
    const nameElement = fixture.debugElement.query(By.css('#user-name')).nativeElement as HTMLParagraphElement;
    const emailElement = fixture.debugElement.query(By.css('#user-email')).nativeElement as HTMLParagraphElement;
    const addressElement = fixture.debugElement.query(By.css('#user-address')).nativeElement as HTMLParagraphElement;

    // Action
    expect(nameElement.textContent).toEqual(component.user.name);
    expect(emailElement.textContent).toEqual(component.user.email);
    expect(addressElement.textContent).toEqual(
      `${component.user.address.street}, ${component.user.address.suite}  | ${component.user.address.city}`,
    );
  });
});
