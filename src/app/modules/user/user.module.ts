import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';

@NgModule({
  declarations: [UserContainerComponent, UserFilterComponent, UserListComponent, UserViewComponent],
  imports: [CommonModule],
  exports: [UserListComponent, UserViewComponent],
})
export class UserModule {}
