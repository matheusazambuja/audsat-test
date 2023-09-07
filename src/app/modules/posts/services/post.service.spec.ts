import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsDeletedStateService } from './posts-deleted.service';
import { of } from 'rxjs';
import { postMocks } from '../../../../testing/mocks/posts.mock';
import { commentsMocks } from '../../../../testing/mocks/comments.mock';
import { HttpStatusCode } from '@angular/common/http';

const BASE_API_URL = 'https://jsonplaceholder.typicode.com';
const postMock = postMocks[0];
const idPostMock = postMock.id;
const idUserMock = 123;
const postsDeleted = [1, 2];

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  let postsDeletedStateService: PostsDeletedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    postsDeletedStateService = TestBed.inject(PostsDeletedStateService);
    jest.spyOn(postsDeletedStateService, 'getPostsDeleted').mockReturnValue(postsDeleted);
    jest.spyOn(postsDeletedStateService, 'persistDelete').mockImplementation();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts by user and filter with posts already deleted', done => {
    // Action
    service.getPostsByUser(idUserMock).subscribe(response => {
      // Assert
      expect(response).toEqual(postMocks.filter(post => !postsDeleted.includes(post.id)));
      expect(postsDeletedStateService.getPostsDeleted).toHaveBeenCalled();
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/users/${idUserMock}/posts`);
    expect(result.request.method).toEqual('GET');

    result.flush(postMocks);
  });

  it('should throw and error when not fetch posts', done => {
    // Arrange
    service.getPostsByUser(idUserMock).subscribe(response => {
      expect(response).toEqual([]);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/users/${idUserMock}/posts`);
    expect(result.request.method).toEqual('GET');

    result.error(new ErrorEvent('Get posts failed'), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should delete post', done => {
    // Action
    service.deletePost(idPostMock).subscribe(response => {
      expect(response).toBeTruthy();
      expect(postsDeletedStateService.persistDelete).toHaveBeenCalledWith(idPostMock);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/posts/${idPostMock}`);
    expect(result.request.method).toEqual('DELETE');

    result.flush(postMock);
  });

  it('should fetch comments by posts', done => {
    // Action
    service.getCommentsByPost(idPostMock).subscribe(response => {
      expect(response).toEqual(commentsMocks);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/posts/${idPostMock}/comments`);
    expect(result.request.method).toEqual('GET');

    result.flush(commentsMocks);
  });

  it('should throw and error when not fetch comments', done => {
    // Action
    service.getCommentsByPost(idPostMock).subscribe(response => {
      expect(response).toEqual([]);
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/posts/${idPostMock}/comments`);
    expect(result.request.method).toEqual('GET');

    result.error(new ErrorEvent('Get comments failed'), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should delete comment by post', done => {
    // Action
    service.deleteCommentByPost(idPostMock).subscribe(response => {
      expect(response).toBeTruthy();
      done();
    });

    // Action
    const result = httpMock.expectOne(`${BASE_API_URL}/posts/${idPostMock}/comments`);
    expect(result.request.method).toEqual('DELETE');

    result.flush({});
  });
});
