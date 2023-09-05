import { Component } from '@angular/core';
import { IPosts } from '../../models/posts.interface';

@Component({
  selector: 'app-posts-accordion',
  templateUrl: './posts-accordion.component.html',
  styleUrls: ['./posts-accordion.component.scss'],
})
export class PostsAccordionComponent {
  public posts: IPosts[] = [
    {
      id: 1,
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'Description 2',
    },
    {
      id: 3,
      title: 'Title 3',
      description: 'Description 3',
    },
  ];

  public handleDelete(id: number): void {
    console.log(`Delete post ${id}`);
  }
}
