import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './containers/posts-container/posts-container.component';
import { PostsRoutingModule } from './posts-routing.module';
import { UserModule } from '../user/user.module';
import { PostsAccordionComponent } from './components/posts-accordion/posts-accordion.component';

@NgModule({
  declarations: [PostsContainerComponent, PostsAccordionComponent],
  imports: [CommonModule, PostsRoutingModule, UserModule],
})
export class PostsModule {}
