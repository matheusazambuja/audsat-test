import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../../modules/user/models/user.interface';
import { IPost } from '../../modules/posts/models/posts.interface';
import { PostsDeletedStateService } from './posts-deleted.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_API_URL = 'https://jsonplaceholder.typicode.com';
  private readonly BASE_USER_API_URL = `${this.BASE_API_URL}/users`;

  constructor(
    private http: HttpClient,
    private postDeletedService: PostsDeletedStateService,
  ) {}

  public getUsers({ name = '', username = '', email = '' } = {}): Observable<IUser[]> {
    let params = new HttpParams().set('name', name).set('username', username).set('email', email);
    params = this.formatParams(params);

    return this.http.get<IUser[]>(`${this.BASE_USER_API_URL}`, { params }).pipe(catchError(() => of([])));
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
