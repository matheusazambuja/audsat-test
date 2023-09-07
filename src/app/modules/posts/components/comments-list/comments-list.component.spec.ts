import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from '../../services/post.service';
import { of } from 'rxjs';
import { commentsMocks } from '../../../../../testing/mocks/comments.mock';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;
  let postService: PostService;

  const postIdMock = 123;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommentsListComponent],
    });

    postService = TestBed.inject(PostService);
    jest.spyOn(postService, 'getCommentsByPost').mockReturnValue(of(commentsMocks));

    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;
    component.postId = postIdMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch comments by post on init', fakeAsync(() => {
    // Assert
    expect(postService.getCommentsByPost).toHaveBeenCalledTimes(1);
    expect(postService.getCommentsByPost).toHaveBeenCalledWith(postIdMock);
    expect(component.comments).toEqual(commentsMocks);
  }));
});
