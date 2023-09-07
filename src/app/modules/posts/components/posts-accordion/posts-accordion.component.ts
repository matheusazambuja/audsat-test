import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPost } from '../../models/posts.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { PostsAccordionService } from './posts-accordion.service';
import { AdminLogsService } from '../../../../core/services/admin-logs.service';
import { LogAction } from '../../../../core/constants/log-action.type.enum';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-accordion',
  templateUrl: './posts-accordion.component.html',
  styleUrls: ['./posts-accordion.component.scss'],
})
export class PostsAccordionComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public posts: IPost[];
  @Output() public delete = new EventEmitter();

  public currentExpanded: number | null;
  private unsubscribe$ = new Subject<void>();
  private readonly DELETE_POST_ACTION = LogAction.DELETE_POST;

  constructor(
    private postsAccordionService: PostsAccordionService,
    private postService: PostService,
    private adminLogsService: AdminLogsService,
  ) {}

  public ngOnInit(): void {
    this.postsAccordionService.currentExpanded$.pipe(takeUntil(this.unsubscribe$)).subscribe(currentExpanded => {
      this.currentExpanded = currentExpanded;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['posts'].firstChange) {
      this.postsAccordionService.setCurrentExpanded(changes['posts'].currentValue[0]?.id);
    }
  }

  public handleDelete(id: number, event: Event): void {
    event.stopPropagation();

    this.postService
      .deletePost(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.adminLogsService.setAdminAction(this.DELETE_POST_ACTION);
        }),
      )
      .subscribe(() => {
        this.delete.emit();
        this.postsAccordionService.setCurrentExpanded(null);
      });
  }

  public toggleExpandedState(id: number, event: Event): void {
    event.stopPropagation();

    const idExpanded = this.currentExpanded != id ? id : null;
    this.postsAccordionService.setCurrentExpanded(idExpanded);
  }
}
