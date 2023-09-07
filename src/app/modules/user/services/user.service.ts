import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_API_URL = 'https://jsonplaceholder.typicode.com';
  private readonly BASE_USER_API_URL = `${this.BASE_API_URL}/users`;

  constructor(private http: HttpClient) {}

  public getUsers({ name = '', username = '', email = '' } = {}): Observable<IUser[]> {
    let params = new HttpParams().set('name', name).set('username', username).set('email', email);
    params = this.formatParams(params);

    return this.http.get<IUser[]>(`${this.BASE_USER_API_URL}`, { params }).pipe(catchError(() => of([])));
  }

  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.BASE_USER_API_URL}/${id}`).pipe(catchError(() => of({} as IUser)));
  }

  private formatParams(params: HttpParams): HttpParams {
    let paramsWithValue = new HttpParams();
    params.keys().forEach(key => {
      const param = params.get(key) || '';

      if (!!params.get(key)) {
        paramsWithValue = paramsWithValue.set(key, param);
      }
    });

    return paramsWithValue;
  }
}
