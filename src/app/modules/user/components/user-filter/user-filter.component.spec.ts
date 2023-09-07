import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserFilterComponent } from './user-filter.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('UserFilterComponent', () => {
  let component: UserFilterComponent;
  let fixture: ComponentFixture<UserFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [UserFilterComponent],
    });
    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    // Action
    expect(component.form.value).toEqual({
      name: '',
      username: '',
      email: '',
    });
  });

  it('should emit filter', fakeAsync(() => {
    // Arrange
    jest.spyOn(component.filter, 'emit').mockImplementation();

    // Action
    const filter = fixture.debugElement.query(By.css('#button-filter')).nativeElement as HTMLButtonElement;
    filter.click();
    tick(500);

    // Assert
    expect(component.filter.emit).toHaveBeenCalled();
    expect(component.filter.emit).toHaveBeenCalledWith(component.form.value);
  }));

  it('should emit filter with form value changed', fakeAsync(() => {
    // Arrange
    const userNameMock = 'User Test 1';
    jest.spyOn(component.filter, 'emit').mockImplementation();
    component.form.get('name')?.setValue(userNameMock);

    // Action
    const filter = fixture.debugElement.query(By.css('#button-filter')).nativeElement as HTMLButtonElement;
    filter.click();
    tick(500); // Wait debounce time

    // Assert
    expect(component.filter.emit).toHaveBeenCalled();
    expect(component.filter.emit).toHaveBeenCalledWith({
      ...component.form.value,
      name: userNameMock,
    });
  }));
});
