import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LogsService } from './logs.service';
import { LogAction } from '../../../core/constants/log-action.type.enum';
import { ILog } from '../models/log.interface';
import { logsMock } from '../../../../testing/mocks/logs.mock';
import { HttpStatusCode } from '@angular/common/http';

const BASE_API_URL = 'http://localhost:3000';

describe('LogsService', () => {
  let service: LogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch logs', done => {
    service.getLogs().subscribe(response => {
      // Assert
      expect(response).toEqual(logsMock);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/logs`);
    expect(result.request.method).toEqual('GET');

    result.flush(logsMock);
  });

  it('should throw and error when not fetch logs', done => {
    service.getLogs().subscribe(response => {
      // Assert
      expect(response).toEqual([]);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/logs`);
    expect(result.request.method).toEqual('GET');

    result.error(new ErrorEvent('Get posts failed'), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should create the log', done => {
    // Arrange
    const actionMock = LogAction.DELETE_POST;
    const logMock: ILog = {
      action: actionMock,
      time: new Date().getTime(),
    };

    service.createLog(actionMock).subscribe(response => {
      // Assert
      expect(response).toBeTruthy();
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/logs`);
    expect(result.request.method).toEqual('POST');
    expect(result.request.body).toEqual(logMock);

    result.flush(logMock);
  });
});
