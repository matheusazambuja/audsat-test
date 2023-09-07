import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  @Output() filter = new EventEmitter();

  private unsubscribe$ = new Subject<void>();
  private emitter = new Subject<void>();
  private readonly DEBOUNCE_TIME_FILTER = 400;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
    this.initListerners();
  }

  public ngOnDestroy(): void {}

  public handleFilter(): void {
    this.emitter.next();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      username: [''],
      email: ['', Validators.email],
    });
  }

  private initListerners(): void {
    this.emitter.pipe(takeUntil(this.unsubscribe$), debounceTime(this.DEBOUNCE_TIME_FILTER)).subscribe(() => {
      this.filter.emit(this.form.value);
    });
  }
}
