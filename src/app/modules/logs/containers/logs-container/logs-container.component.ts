import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { Subject, Subscriber, takeUntil } from 'rxjs';
import { ILog } from '../../models/log.interface';

@Component({
  selector: 'app-logs-container',
  templateUrl: './logs-container.component.html',
  styleUrls: ['./logs-container.component.scss'],
})
export class LogsContainerComponent implements OnInit, OnDestroy {
  public logs: ILog[];

  private unsubscribe$ = new Subject<void>();

  constructor(private logsService: LogsService) {}

  public ngOnInit(): void {
    this.loadLogsData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadLogsData(): void {
    this.logsService
      .getLogs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(logs => {
        this.logs = this.formatLogs(logs);
      });
  }

  private formatLogs(logs: ILog[]): ILog[] {
    return logs.map(
      log =>
        ({
          ...log,
          action: log.action.replace('_', ' '),
        }) as ILog,
    );
  }
}
