import { Component, EventEmitter, Input, OnInit, Output, numberAttribute } from '@angular/core';
import { IPost } from '../../models/posts.interface';
import { PostService } from '../../../../core/services/post.service';
import { Subject, takeUntil } from 'rxjs';
import { PostsAccordionService } from './posts-accordion.service';

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

  constructor(
    private postsAccordionService: PostsAccordionService,
    private postService: PostService,
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
      .pipe(takeUntil(this.unsubscribe$))
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
