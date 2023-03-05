import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRosterModule } from './modules/shared-roster.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedRosterModule],
  exports: [SharedRosterModule],
})
export class SharedModule {}
