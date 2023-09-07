import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PostsContainerComponent } from './posts-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { postMocks } from '../../../../../testing/mocks/posts.mock';
import { PostsAccordionComponent } from '../../components/posts-accordion/posts-accordion.component';
import { UserViewComponent } from '../../../../modules/user/components/user-view/user-view.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../../../../modules/shared/components/header/header.component';
import { UserModule } from '../../../../modules/user/user.module';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;
  let postService: PostService;
  let activatedRoute: ActivatedRoute;
  const userIdMock = 123;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), UserModule],
      declarations: [PostsContainerComponent, PostsAccordionComponent, UserViewComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(PostsContainerComponent);
    postService = TestBed.inject(PostService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    jest.spyOn(activatedRoute.snapshot.paramMap, 'get').mockReturnValue(userIdMock.toString());
    jest.spyOn(postService, 'getPostsByUser').mockReturnValue(of(postMocks));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user id', () => {
    // Action
    expect(component.userId).toEqual(userIdMock);
  });

  it('should fetch posts', fakeAsync(() => {
    // Action
    tick(1000);

    // Assert
    expect(postService.getPostsByUser).toHaveBeenCalledTimes(1);
    expect(postService.getPostsByUser).toHaveBeenCalledWith(userIdMock);
    expect(component.posts).toEqual(postMocks);
  }));

  it('should fetch again posts when delete item', fakeAsync(() => {
    // Action
    component.handleDelete();
    tick(1000);

    // Assert
    expect(postService.getPostsByUser).toHaveBeenCalledTimes(2);
    expect(postService.getPostsByUser).toHaveBeenCalledWith(userIdMock);
    expect(component.posts).toEqual(postMocks);
  }));
});
