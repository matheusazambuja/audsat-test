import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { LogAction } from '../constants/log-action.type.enum';
import { LogsService } from '../../modules/logs/services/logs.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLogsService {
  private adminLog$ = new Subject<LogAction>();
  private adminLog: Observable<LogAction>;

  constructor(private logsService: LogsService) {
    this.adminLog = this.adminLog$.asObservable();
    this.adminLog.pipe(switchMap(action => this.logsService.createLog(action))).subscribe();
  }

  public setAdminAction(action: LogAction): void {
    this.adminLog$.next(action);
  }
}
