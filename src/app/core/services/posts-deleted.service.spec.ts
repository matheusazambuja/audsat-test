import { TestBed } from '@angular/core/testing';

import { PostsDeletedService } from './posts-deleted.service';

describe('PostsDeletedService', () => {
  let service: PostsDeletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsDeletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
