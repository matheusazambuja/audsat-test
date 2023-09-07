import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AdminLogsService } from './admin-logs.service';
import { LogsService } from '../../modules/logs/services/logs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogsModule } from '../../modules/logs/logs.module';
import { LogAction } from '../constants/log-action.type.enum';
import { of } from 'rxjs';
import { ILog } from '../../modules/logs/models/log.interface';

describe('AdminLogsService', () => {
  let service: AdminLogsService;
  let logsService: LogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LogsModule],
    });
    service = TestBed.inject(AdminLogsService);
    logsService = TestBed.inject(LogsService);

    jest.spyOn(logsService, 'createLog').mockReturnValue(of({} as ILog));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set action and call create log', fakeAsync(() => {
    // Action
    service.setAdminAction(LogAction.DELETE_POST);
    tick(1000);

    // Assert
    expect(logsService.createLog).toHaveBeenCalledTimes(1);
  }));
});
