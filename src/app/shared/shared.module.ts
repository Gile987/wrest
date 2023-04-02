import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRosterModule } from './modules/shared-roster.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, SharedRosterModule, RouterModule],
  exports: [SharedRosterModule],
})
export class SharedModule {}
