import { Component, EventEmitter, Input, OnInit, Output, numberAttribute } from '@angular/core';
import { IPost } from '../../models/posts.interface';
import { PostService } from '../../../../core/services/post.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { PostsAccordionService } from './posts-accordion.service';
import { AdminLogsService } from '../../../../core/services/admin-logs.service';
import { LogAction } from '../../../../core/constants/log-action.type.enum';

@Component({
  selector: 'app-posts-accordion',
  templateUrl: './posts-accordion.component.html',
  styleUrls: ['./posts-accordion.component.scss'],
})
export class PostsAccordionComponent implements OnInit {
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
      console.log(currentExpanded);
      this.currentExpanded = currentExpanded;
    });
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
    // if (this.currentExpanded === null) {
    //   this.postsAccordionService.setCurrentExpanded(id);
    //   return;
    // }
    const idExpanded = this.currentExpanded != id ? id : null;
    this.postsAccordionService.setCurrentExpanded(idExpanded);
  }
}
