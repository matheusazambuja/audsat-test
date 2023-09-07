import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsAccordionService {
  public currentExpanded$: Observable<number | null>;
  private currentExpanded = new BehaviorSubject<number | null>(null);

  constructor() {
    this.currentExpanded$ = this.currentExpanded.asObservable();
  }

  public setCurrentExpanded(id: number | null): void {
    this.currentExpanded.next(id);
  }
}
