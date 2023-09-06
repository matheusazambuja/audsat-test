import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsDeletedStateService {
  private readonly postDeleted$ = new Subject<number>();
  private readonly POST_IDS_DELETED: number[] = [];

  constructor() {
    this.initListernerPostDelete();
  }

  public persistDelete(id: number): void {
    this.postDeleted$.next(id);
  }

  public getPostsDeleted(): number[] {
    return this.POST_IDS_DELETED;
  }

  private initListernerPostDelete(): void {
    this.postDeleted$.asObservable().subscribe(id => {
      if (!this.POST_IDS_DELETED.includes(id)) {
        this.POST_IDS_DELETED.push(id);
      }
    });
  }
}
