import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContainerComponent } from './admin-container.component';
import { UserListComponent } from '../../../user/components/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { UserModule } from '../../../../modules/user/user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CssSelector } from '@angular/compiler';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../../../../modules/shared/components/header/header.component';
import { SharedModule } from '../../../../modules/shared/shared.module';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, UserModule, SharedModule],
      declarations: [AdminContainerComponent, UserListComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init all components', () => {
    // Arrange
    const userListComponent = fixture.debugElement.query(By.css('app-user-list'));
    const headerComponent = fixture.debugElement.query(By.css('app-header'));

    // Assert
    expect(userListComponent).toBeTruthy();
    expect(headerComponent).toBeTruthy();
  });
});
