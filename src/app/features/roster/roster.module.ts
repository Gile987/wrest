import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterRoutingModule } from './roster-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RosterComponent } from './roster.component';

@NgModule({
  declarations: [
    RosterComponent
  ],
  imports: [
    CommonModule,
    RosterRoutingModule,
    SharedModule,
  ],
})
export class RosterModule { }
