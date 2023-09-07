import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IComment } from 'src/app/modules/posts/models/comment.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() public postId: number;

  public comments: IComment[];

  private unsubscribe$ = new Subject<void>();

  constructor(private postService: PostService) {}

  public ngOnInit(): void {
    this.loadCommentsData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadCommentsData(): void {
    this.postService
      .getCommentsByPost(this.postId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.comments = response;
      });
  }
}
