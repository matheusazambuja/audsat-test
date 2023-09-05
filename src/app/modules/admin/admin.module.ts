import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [AdminContainerComponent],
  imports: [CommonModule, AdminRoutingModule, UserModule],
})
export class AdminModule {}
