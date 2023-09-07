import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsContainerComponent } from './logs-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogsService } from '../../services/logs.service';
import { of } from 'rxjs';
import { logsMock } from '../../../../../testing/mocks/logs.mock';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { HeaderComponent } from '../../../../modules/shared/components/header/header.component';

describe('LogsContainerComponent', () => {
  let component: LogsContainerComponent;
  let fixture: ComponentFixture<LogsContainerComponent>;
  let logsService: LogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [LogsContainerComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(LogsContainerComponent);

    logsService = TestBed.inject(LogsService);
    jest.spyOn(logsService, 'getLogs').mockReturnValue(of(logsMock));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and format logs on initialization', () => {
    // Arrange
    expect(logsService.getLogs).toHaveBeenCalledTimes(1);
    expect(component.logs).toEqual(
      logsMock.map(log => ({
        ...log,
        action: log.action.replace('_', ' '),
      })),
    );
  });
});
