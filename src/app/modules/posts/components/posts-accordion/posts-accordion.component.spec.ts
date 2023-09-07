import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PostsAccordionComponent } from './posts-accordion.component';
import { PostsAccordionService } from './posts-accordion.service';
import { PostService } from '../../services/post.service';
import { AdminLogsService } from '../../../../core/services/admin-logs.service';
import { postMocks } from '../../../../../testing/mocks/posts.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostsModule } from '../../posts.module';
import { UserModule } from '../../../../modules/user/user.module';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CommentsListComponent } from '../comments-list/comments-list.component';

describe('PostsAccordionComponent', () => {
  let component: PostsAccordionComponent;
  let fixture: ComponentFixture<PostsAccordionComponent>;
  let postsAccordionService: PostsAccordionService;
  let postsService: PostService;
  let adminLogsService: AdminLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, PostsModule, UserModule],
      declarations: [PostsAccordionComponent, CommentsListComponent],
    });
    fixture = TestBed.createComponent(PostsAccordionComponent);

    postsAccordionService = TestBed.inject(PostsAccordionService);
    postsService = TestBed.inject(PostService);
    adminLogsService = TestBed.inject(AdminLogsService);

    jest.spyOn(postsService, 'deletePost').mockReturnValue(of({}));
    jest.spyOn(adminLogsService, 'setAdminAction').mockImplementation();
    jest.spyOn(postsAccordionService, 'setCurrentExpanded');

    component = fixture.componentInstance;
    component.posts = postMocks;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnChanges', () => {
    it('should show comment of first posts', () => {
      // Arrange
      const changesObject = {
        posts: new SimpleChange(null, postMocks, false),
      };
      component.ngOnChanges(changesObject);

      // Assert
      expect(component.currentExpanded).toEqual(1);
    });

    it('should close first post because is already expanded', () => {
      // Arrange
      const changesObject = {
        posts: new SimpleChange(null, postMocks, false),
      };
      component.ngOnChanges(changesObject);

      const firstPostElement = fixture.debugElement.query(By.css('#post-item-0')).nativeElement as HTMLDivElement;

      // Action
      firstPostElement.click();

      expect(postsAccordionService.setCurrentExpanded).toHaveBeenCalledWith(null);
      expect(component.currentExpanded).toEqual(null);
    });

    it('should change post expanded', () => {
      // Arrange
      const changesObject = {
        posts: new SimpleChange(null, postMocks, false),
      };
      component.ngOnChanges(changesObject);

      const secondPostElement = fixture.debugElement.query(By.css('#post-item-1')).nativeElement as HTMLDivElement;

      // Action
      secondPostElement.click();

      expect(postsAccordionService.setCurrentExpanded).toHaveBeenCalledWith(2);
      expect(component.currentExpanded).toEqual(2);
    });
  });

  it('should delete post', fakeAsync(() => {
    // Arrange
    const firstPostElement = fixture.debugElement.query(By.css('#post-item-0'));
    const buttonDeleteFirstPost = firstPostElement.query(By.css('#button-delete-0')).nativeElement as HTMLButtonElement;

    // Action
    buttonDeleteFirstPost.click();
    tick(1000);

    expect(postsService.deletePost).toHaveBeenCalledTimes(1);
    expect(postsService.deletePost).toHaveBeenCalledWith(1);
    expect(adminLogsService.setAdminAction).toHaveBeenCalledTimes(1);
    expect(postsAccordionService.setCurrentExpanded).toHaveBeenCalledWith(null);
  }));
});
