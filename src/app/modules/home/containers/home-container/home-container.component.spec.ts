import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContainerComponent } from './home-container.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../../../../modules/shared/components/header/header.component';
import { SharedModule } from '../../../../modules/shared/shared.module';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomeContainerComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init header component', () => {
    // Arrange
    const headerComponent = fixture.debugElement.query(By.css('app-header'));

    // Assert
    expect(headerComponent).toBeTruthy();
  });

  it('should show title in template', () => {
    const titleElement = fixture.debugElement.query(By.css('#title'));

    expect(titleElement.nativeElement.textContent).toBe(component.title);
  });

  it('should show subtitle with name proporty in template', () => {
    const titleElement = fixture.debugElement.query(By.css('#subtitle'));

    expect(titleElement.nativeElement.textContent.trim()).toBe(`Teste realizado por ${component.name} em 07/09/2023`);
  });
});
