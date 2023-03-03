import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrestlerListComponent } from '../core/components/wrestler-list/wrestler-list.component';

@NgModule({
  declarations: [
    WrestlerListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WrestlerListComponent,
  ],
})
export class SharedModule { }
