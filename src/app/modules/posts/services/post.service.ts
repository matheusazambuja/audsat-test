import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { IPost } from '../models/posts.interface';
import { HttpClient } from '@angular/common/http';
import { PostsDeletedStateService } from './posts-deleted.service';
import { IComment } from '../models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly BASE_API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
    private postsDeletedStateService: PostsDeletedStateService,
  ) {}

  public getPostsByUser(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.BASE_API_URL}/users/${id}/posts`).pipe(
      map(response => {
        const idsPosts = response.map(({ id }) => id);
        const idsPostsNotDeleted = idsPosts.filter(id => !this.postsDeletedStateService.getPostsDeleted().includes(id));

        return response.filter(post => idsPostsNotDeleted.includes(post.id));
      }),
      catchError(() => of([])),
    );
  }

  public deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.BASE_API_URL}/posts/${id}`).pipe(
      tap(() => {
        this.postsDeletedStateService.persistDelete(id);
      }),
    );
  }

  public getCommentsByPost(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.BASE_API_URL}/posts/${id}/comments`);
  }

  public deleteCommentByPost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.BASE_API_URL}/posts/${id}/comments`);
  }
}
