import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAccordionComponent } from './posts-accordion.component';

describe('PostsAccordionComponent', () => {
  let component: PostsAccordionComponent;
  let fixture: ComponentFixture<PostsAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsAccordionComponent]
    });
    fixture = TestBed.createComponent(PostsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
