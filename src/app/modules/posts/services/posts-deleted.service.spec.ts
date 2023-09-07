import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PostsDeletedStateService } from './posts-deleted.service';

describe('PostsDeletedStateService', () => {
  let service: PostsDeletedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsDeletedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should persist post deleted', fakeAsync(() => {
    // Arrange
    const postIdMock = 123;

    // Action
    service.persistDelete(postIdMock);
    tick(1000);

    // Assert
    expect(service.getPostsDeleted()).toEqual([postIdMock]);
  }));

  it('should not persist post deleted when is same post', fakeAsync(() => {
    // Arrange
    const postIdMock = 123;

    // Action
    service.persistDelete(postIdMock);
    tick(1000);
    service.persistDelete(postIdMock);
    tick(1000);

    // Assert
    expect(service.getPostsDeleted()).toEqual([postIdMock]);
  }));

  it('should persist second post deleted', fakeAsync(() => {
    // Arrange
    const postIdMock = 123;
    const newPostIdMock = 456;

    // Action
    service.persistDelete(postIdMock);
    tick(1000);
    service.persistDelete(newPostIdMock);
    tick(1000);

    // Assert
    expect(service.getPostsDeleted()).toEqual([postIdMock, newPostIdMock]);
  }));
});
