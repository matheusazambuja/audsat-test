import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './containers/posts-container/posts-container.component';
import { PostsRoutingModule } from './posts-routing.module';
import { UserModule } from '../user/user.module';
import { PostsAccordionComponent } from './components/posts-accordion/posts-accordion.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';

@NgModule({
  declarations: [PostsContainerComponent, PostsAccordionComponent, CommentsListComponent],
  imports: [CommonModule, PostsRoutingModule, UserModule],
})
export class PostsModule {}
