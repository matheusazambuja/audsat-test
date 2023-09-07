import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { LogAction } from '../constants/log-action.type.enum';
import { LogsService } from '../../modules/logs/services/logs.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLogsService {
  private readonly adminLog$ = new Subject<LogAction>();
  private readonly adminLog: Observable<LogAction> = this.adminLog$.asObservable();

  private readonly DEBOUNCE_TIME = 300;

  constructor(private logsService: LogsService) {
    this.adminLog
      .pipe(
        debounceTime(this.DEBOUNCE_TIME),
        switchMap(action => this.logsService.createLog(action)),
      )
      .subscribe();
  }

  public setAdminAction(action: LogAction): void {
    this.adminLog$.next(action);
  }
}
