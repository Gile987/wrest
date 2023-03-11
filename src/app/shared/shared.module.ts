import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRosterModule } from './modules/shared-roster.module';
import { BubbleHeaderComponent } from './components/bubble-header/bubble-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BubbleHeaderComponent
  ],
  imports: [CommonModule, SharedRosterModule, RouterModule],
  exports: [SharedRosterModule, BubbleHeaderComponent],
})
export class SharedModule {}
