import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsContainerComponent } from './containers/logs-container/logs-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LogsContainerComponent],
  imports: [CommonModule, LogsRoutingModule, SharedModule],
})
export class LogsModule {}
