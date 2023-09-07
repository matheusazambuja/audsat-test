import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILog } from '../models/log.interface';
import { LogAction } from '../../../core/constants/log-action.type.enum';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private readonly BASE_API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getLogs(): Observable<ILog[]> {
    return this.http.get<ILog[]>(`${this.BASE_API_URL}/logs`);
  }

  public createLog(action: LogAction): Observable<ILog> {
    const log: ILog = {
      action,
      time: new Date().getTime(),
    };
    return this.http.post<ILog>(`${this.BASE_API_URL}/logs`, log);
  }
}
