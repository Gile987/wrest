import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { RosterRoutingModule } from './roster-routing.module';
import { SharedRosterModule } from 'src/app/shared/shared-roster.module';

@NgModule({
  declarations: [
    RosterComponent,
  ],
  imports: [
    CommonModule,
    SharedRosterModule,
    RosterRoutingModule
  ],
  exports: [
    RosterComponent
  ]
})
export class RosterModule { }
