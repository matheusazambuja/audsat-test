import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [
    UserContainerComponent,
    UserFilterComponent,
    UserListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
