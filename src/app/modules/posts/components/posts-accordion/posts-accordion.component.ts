import { Component } from '@angular/core';
import { IPost } from '../../models/posts.interface';

@Component({
  selector: 'app-posts-accordion',
  templateUrl: './posts-accordion.component.html',
  styleUrls: ['./posts-accordion.component.scss'],
})
export class PostsAccordionComponent {
  public posts: IPost[] = [
    {
      id: 1,
      title: 'Title 1',
      body: 'Description 1',
    },
    {
      id: 2,
      title: 'Title 2',
      body: 'Description 2',
    },
    {
      id: 3,
      title: 'Title 3',
      body: 'Description 3',
    },
  ];

  public handleDelete(id: number): void {
    console.log(`Delete post ${id}`);
  }
}
