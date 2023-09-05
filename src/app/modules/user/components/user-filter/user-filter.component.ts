import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  @Output() filter = new EventEmitter();

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
    this.initListerners();
  }

  public ngOnDestroy(): void {}

  public handleFilter(): void {
    this.filter.emit(this.form.value);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      username: [''],
      email: ['', Validators.email],
    });
  }

  private initListerners(): void {
    this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => console.log);
  }
}
