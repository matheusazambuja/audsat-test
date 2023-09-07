import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { usersMock } from '../../../../testing/mocks/users.mock';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

const BASE_USER_API_URL = 'https://jsonplaceholder.typicode.com/users';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const userMock = usersMock[0];
  const idUserMock = userMock.id;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user', done => {
    // Arrange
    service.getUser(idUserMock).subscribe(response => {
      expect(response).toEqual(userMock);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_USER_API_URL}/${idUserMock}`);
    expect(result.request.method).toEqual('GET');

    result.flush(userMock);
  });

  it('should throw and error when not fetch user', done => {
    // Arrange
    service.getUser(idUserMock).subscribe(response => {
      expect(response).toEqual({});
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_USER_API_URL}/${idUserMock}`);
    expect(result.request.method).toEqual('GET');

    result.error(new ErrorEvent('Get user failed'), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should fetch users', done => {
    // Arrange
    service.getUsers().subscribe(response => {
      expect(response).toEqual(usersMock);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_USER_API_URL}`);
    expect(result.request.method).toEqual('GET');
    expect(result.request.params.get('name')).toBeFalsy();
    expect(result.request.params.get('username')).toBeFalsy();
    expect(result.request.params.get('email')).toBeFalsy();

    result.flush(usersMock);
  });

  it('should throw and error when not fetch users', done => {
    // Arrange
    service.getUsers().subscribe(response => {
      expect(response).toEqual([]);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_USER_API_URL}`);
    expect(result.request.method).toEqual('GET');

    result.error(new ErrorEvent('Get users failed'), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should fetch users with params', done => {
    // Arrange
    const paramsMock = {
      name: 'Usertest',
      email: 'user-test@gmail.com',
      username: 'user-test',
    };

    service.getUsers(paramsMock).subscribe(response => {
      expect(response).toEqual(usersMock);
      done();
    });

    // Action
    const result = httpMock.expectOne(
      `${BASE_USER_API_URL}?name=${paramsMock.name}&username=${paramsMock.username}&email=${paramsMock.email}`,
    );
    expect(result.request.method).toEqual('GET');
    expect(result.request.params.get('name')).toEqual(paramsMock.name);
    expect(result.request.params.get('username')).toEqual(paramsMock.username);
    expect(result.request.params.get('email')).toEqual(paramsMock.email);

    result.flush(usersMock);
  });
});
