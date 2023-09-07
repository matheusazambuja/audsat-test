import { TestBed, fakeAsync, tick } from '@angular/core/testing';

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

  it('should initialize current active expanded with null', () => {
    // Action
    service.currentExpanded$.subscribe(currentExpanded => {
      expect(currentExpanded).toBeNull();
    });
  });

  describe('setCurrentExpanded', () => {
    it('should set current active expanded', () => {
      // Arrange
      const currentPostActive = 1;

      service.setCurrentExpanded(currentPostActive);

      service.currentExpanded$.subscribe(currentExpanded => {
        expect(currentExpanded).toEqual(currentPostActive);
      });
    });

    it('should change current active expanded', fakeAsync(() => {
      // Arrange
      const lastPostActive = 1;
      const currentPostActive = 2;

      // Action
      service.setCurrentExpanded(lastPostActive);
      tick(1000);
      service.setCurrentExpanded(currentPostActive);

      service.currentExpanded$.subscribe(currentExpanded => {
        // Assert
        expect(currentExpanded).toEqual(currentPostActive);
      });
    }));
  });
});
