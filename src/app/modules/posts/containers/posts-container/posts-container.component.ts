import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { IPost } from '../../models/posts.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
})
export class PostsContainerComponent implements OnInit, OnDestroy {
  public posts: IPost[];
  public userId: number;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id') || null);
    this.loadPostsData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public handleDelete(): void {
    this.loadPostsData();
  }

  private loadPostsData(): void {
    this.postService
      .getPostsByUser(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}
