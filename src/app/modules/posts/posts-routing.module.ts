import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsContainerComponent } from './containers/posts-container/posts-container.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'view',
        component: PostsContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
