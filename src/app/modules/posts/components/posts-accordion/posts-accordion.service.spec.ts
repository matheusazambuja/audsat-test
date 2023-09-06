import { TestBed } from '@angular/core/testing';

import { PostsAccordionService } from './posts-accordion.service';

describe('PostsAccordionService', () => {
  let service: PostsAccordionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsAccordionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
