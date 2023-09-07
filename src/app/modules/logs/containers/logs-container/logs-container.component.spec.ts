import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsContainerComponent } from './logs-container.component';

describe('LogsContainerComponent', () => {
  let component: LogsContainerComponent;
  let fixture: ComponentFixture<LogsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsContainerComponent]
    });
    fixture = TestBed.createComponent(LogsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
